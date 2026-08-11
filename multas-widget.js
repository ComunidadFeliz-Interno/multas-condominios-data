/* Buscador de multas de condominios — administradoreschile.cl
   Requiere en la página un contenedor #cf-multas con #cfm-q, #cfm-btn y #cfm-out. */
(function(){
  var DATA_URL = "https://cdn.jsdelivr.net/gh/ComunidadFeliz-Interno/multas-condominios-data@main/multas_condominios.json";

  var PAGE = 15;          // resultados por pagina en la lista
  var DETAIL_PAGE = 25;   // multas mostradas al abrir un condominio

  var out = document.getElementById('cfm-out');
  var input = document.getElementById('cfm-q');
  var btn = document.getElementById('cfm-btn');
  if(!out || !input || !btn) return;

  var DATA = null, INDEX = null, loading = false, shown = PAGE, lastResults = [];

  function norm(s){
    return (s||'').toString().toUpperCase()
      .normalize('NFD').replace(/[̀-ͯ]/g,'')
      .replace(/[^A-Z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  }
  function normRut(s){ return (s||'').toString().toUpperCase().replace(/[^0-9K]/g,''); }
  function esc(s){ return (s||'').replace(/[&<>"]/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  function loadData(cb){
    if(DATA){ cb(); return; }
    if(loading) return;
    loading = true;
    out.innerHTML = '<div class="cfm-status">Cargando base de multas…</div>';
    fetch(DATA_URL).then(function(r){
      if(!r.ok) throw new Error('HTTP '+r.status);
      return r.json();
    }).then(function(j){
      DATA = j;
      INDEX = j.items.map(function(it){
        return {it:it, sn:norm(it.nombre), sr:normRut(it.rut)};
      });
      loading = false;
      cb();
    }).catch(function(e){
      loading = false;
      out.innerHTML = '<div class="cfm-empty"><b>No pudimos cargar la información.</b><br>Intenta nuevamente en unos segundos.</div>';
      console.error('cf-multas:', e);
    });
  }

  function search(q){
    var nq = norm(q), rq = normRut(q);
    var terms = nq.split(' ').filter(Boolean);
    var res = [];
    for(var i=0;i<INDEX.length;i++){
      var e = INDEX[i], ok=false;
      if(rq.length >= 4 && e.sr.indexOf(rq) !== -1) ok = true;
      if(!ok && terms.length){
        ok = terms.every(function(t){ return e.sn.indexOf(t) !== -1; });
      }
      if(ok) res.push(e.it);
    }
    res.sort(function(a,b){ return b.n - a.n; });
    return res;
  }

  function render(){
    var q = input.value.trim();
    if(q.length < 3){
      out.innerHTML = '<div class="cfm-status">Escribe al menos 3 caracteres para buscar.</div>';
      return;
    }
    loadData(function(){
      lastResults = search(q);
      shown = PAGE;
      paint();
    });
  }

  function paint(){
    var res = lastResults;
    if(!res.length){
      out.innerHTML = '<div class="cfm-empty"><b>No encontramos multas</b> para “'+esc(input.value.trim())+'”.'+
        '<br>Prueba con otra parte del nombre o revisa el RUT.</div>';
      return;
    }
    var html = '<div class="cfm-count">'+res.length+' resultado'+(res.length>1?'s':'')+'</div>';
    res.slice(0, shown).forEach(function(it, idx){
      html += card(it, idx);
    });
    if(res.length > shown){
      html += '<div class="cfm-more"><button type="button" data-more="1">Ver más resultados ('+(res.length-shown)+')</button></div>';
    }
    out.innerHTML = html;
  }

  function card(it, idx){
    var h = '';
    h += '<div class="cfm-card" data-i="'+idx+'">';
    h +=   '<div class="cfm-cardhead" data-toggle="1">';
    h +=     '<div style="min-width:0;flex:1;">';
    h +=       '<p class="cfm-nombre">'+esc(it.nombre)+'</p>';
    h +=       '<div class="cfm-sub"><span class="cfm-badge">'+esc(it.cat)+'</span>'+
                 '<span>RUT '+esc(it.rut)+'</span>'+
                 '<span>'+it.pag+' pagada'+(it.pag===1?'':'s')+' · '+it.tram+' en cobranza</span></div>';
    h +=     '</div>';
    h +=     '<div class="cfm-metric"><b>'+it.n+'</b><span>multa'+(it.n===1?'':'s')+'</span></div>';
    h +=     '<div class="cfm-chev">▶</div>';
    h +=   '</div>';
    h +=   '<div class="cfm-detail" data-detail>'+detail(it, DETAIL_PAGE)+'</div>';
    h += '</div>';
    return h;
  }

  function detail(it, lim){
    var rows = it.multas.slice(0, lim).map(function(m){
      var st = m.e === 'PAGADA' ? 'pag' : 'tram';
      return '<tr>'+
        '<td>'+esc(m.f)+'</td>'+
        '<td><span class="cfm-st '+st+'">'+esc(m.e)+'</span></td>'+
        '<td class="cfm-mo">'+esc(m.mo)+' '+esc(m.t)+'</td>'+
        '<td>'+esc(m.p)+'</td>'+
        '<td class="cfm-en">'+esc(m.en)+'</td>'+
      '</tr>';
    }).join('');
    var extra = it.multas.length > lim
      ? '<div class="cfm-more"><button type="button" data-detailmore="1">Ver las '+(it.multas.length-lim)+' multas restantes</button></div>'
      : '';
    return '<div class="cfm-tablewrap"><table>'+
      '<thead><tr><th>Fecha</th><th>Estado</th><th>Monto</th><th>Procedencia</th><th>Infracción</th></tr></thead>'+
      '<tbody>'+rows+'</tbody></table></div>'+extra;
  }

  out.addEventListener('click', function(e){
    var moreBtn = e.target.closest('[data-more]');
    if(moreBtn){ shown += PAGE; paint(); return; }
    var head = e.target.closest('[data-toggle]');
    if(head){ head.parentNode.classList.toggle('open'); return; }
    var dmore = e.target.closest('[data-detailmore]');
    if(dmore){
      var c = dmore.closest('.cfm-card');
      var it = lastResults[+c.getAttribute('data-i')];
      c.querySelector('[data-detail]').innerHTML = detail(it, 9999);
      return;
    }
  });

  btn.addEventListener('click', render);
  var t;
  input.addEventListener('input', function(){ clearTimeout(t); t = setTimeout(render, 220); });
  input.addEventListener('keydown', function(e){ if(e.key==='Enter'){ clearTimeout(t); render(); }});

  // auto-buscar desde ?rut= o ?q= (handoff desde el formulario HubSpot)
  try{
    var p = new URLSearchParams(location.search);
    var pre = p.get('rut') || p.get('q');
    if(pre){ input.value = pre; render(); }
  }catch(_){}
})();
