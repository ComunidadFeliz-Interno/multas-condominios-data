/* Buscador de multas de condominios — administradoreschile.cl/multas-dt-resultado
   AUTO-MONTANTE: oculta las secciones heredadas del cotizador, inyecta un hero compacto
   coherente con la landing (/multas-dt) y monta el buscador en el primer .w-embed vacío.
   Lee ?q= / ?rut= de la URL para auto-buscar (handoff desde el formulario HubSpot). */
(function(){
  var DATA_URL = "https://cdn.jsdelivr.net/gh/ComunidadFeliz-Interno/multas-condominios-data@main/multas_condominios.json";
  var PAGE = 15, DETAIL_PAGE = 25;

  var CSS = ''+
  "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');"+
  /* ocultar secciones heredadas del cotizador */
  ".div-block-961,.div-block-962,.div-block-969{display:none !important;}"+
  /* seccion del widget sobre blanco */
  ".div-block-967{background:#fff !important;padding-top:16px !important;padding-bottom:40px !important;font-family:'Montserrat',Arial,sans-serif !important;}"+
  ".div-block-970{padding-top:0 !important;padding-bottom:0 !important;}"+

  /* ===== HERO COMPACTO (coherente con la landing) ===== */
  "#cfm-rhero{font-family:'Montserrat',Arial,sans-serif;background:linear-gradient(155deg,#3B2AB1 0%,#4B39C9 48%,#241B7E 100%);color:#fff;padding:150px 24px 46px;text-align:center;}"+
  "#cfm-rhero *{box-sizing:border-box;}"+
  "#cfm-rhero h1{font-size:2.1rem;line-height:1.15;font-weight:800;margin:0 0 10px;color:#fff;}"+
  "#cfm-rhero p{font-size:1rem;line-height:1.5;color:rgba(255,255,255,.85);margin:0 auto;max-width:44em;}"+
  "@media(max-width:900px){#cfm-rhero{padding:100px 18px 30px;}#cfm-rhero h1{font-size:1.5rem;}#cfm-rhero p{font-size:.92rem;}}"+

  /* ===== WIDGET ===== */
  "#cf-multas{--acc:#3B2AB1;--acc-d:#2A1D8F;--ink:#1c2430;--mut:#5c6b7a;--line:#e3e8ee;--bg:#fff;--soft:#F6F7FC;--pag:#127a3e;--pag-bg:#e6f4ea;--tram:#b4531a;--tram-bg:#fbeee1;max-width:920px;margin:0 auto;padding:8px 6px 48px;color:var(--ink);font-family:'Montserrat',Arial,sans-serif;-webkit-font-smoothing:antialiased;}"+
  '#cf-multas *{box-sizing:border-box;}'+
  '#cf-multas .cfm-searchbar{position:relative;display:flex;gap:10px;background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:8px;box-shadow:0 10px 30px rgba(20,25,60,.10);}'+
  '#cf-multas .cfm-searchbar input{flex:1;border:0;outline:0;font-size:1.02rem;padding:12px 14px;background:transparent;color:var(--ink);border-radius:10px;font-family:inherit;min-width:0;}'+
  '#cf-multas .cfm-searchbar input::placeholder{color:#9aa7b4;}'+
  '#cf-multas .cfm-searchbar button{border:0;background:var(--acc);color:#fff;font-weight:700;padding:0 22px;border-radius:10px;cursor:pointer;font-size:.98rem;transition:background .15s;font-family:inherit;}'+
  '#cf-multas .cfm-searchbar button:hover{background:var(--acc-d);}'+
  '#cf-multas .cfm-hint{margin:10px 2px 0;font-size:.8rem;color:var(--mut);}'+
  '#cf-multas .cfm-status{margin:22px 2px;color:var(--mut);font-size:.95rem;text-align:center;}'+
  '#cf-multas .cfm-count{margin:22px 2px 8px;font-size:.9rem;color:var(--mut);font-weight:600;}'+
  '#cf-multas .cfm-card{background:var(--bg);border:1px solid var(--line);border-radius:14px;margin:12px 0;overflow:hidden;}'+
  '#cf-multas .cfm-cardhead{display:flex;align-items:center;gap:14px;padding:16px 18px;cursor:pointer;transition:background .12s;}'+
  '#cf-multas .cfm-cardhead:hover{background:var(--soft);}'+
  '#cf-multas .cfm-nombre{font-weight:700;font-size:1.02rem;line-height:1.3;margin:0 0 3px;}'+
  '#cf-multas .cfm-sub{font-size:.83rem;color:var(--mut);display:flex;flex-wrap:wrap;gap:8px 14px;}'+
  '#cf-multas .cfm-badge{display:inline-block;font-size:.7rem;font-weight:700;padding:3px 9px;border-radius:999px;background:#EEF0FA;color:#3B2AB1;white-space:nowrap;}'+
  '#cf-multas .cfm-metric{margin-left:auto;text-align:right;flex:none;}'+
  '#cf-multas .cfm-metric b{font-size:1.5rem;display:block;line-height:1;color:var(--acc);}'+
  '#cf-multas .cfm-metric span{font-size:.7rem;color:var(--mut);text-transform:uppercase;letter-spacing:.03em;}'+
  '#cf-multas .cfm-chev{flex:none;color:#b7c2ce;transition:transform .18s;font-size:1rem;}'+
  '#cf-multas .cfm-card.open .cfm-chev{transform:rotate(90deg);}'+
  '#cf-multas .cfm-detail{display:none;border-top:1px solid var(--line);padding:6px 0 4px;background:var(--soft);}'+
  '#cf-multas .cfm-card.open .cfm-detail{display:block;}'+
  '#cf-multas .cfm-tablewrap{overflow-x:auto;}'+
  '#cf-multas table{width:100%;border-collapse:collapse;font-size:.84rem;min-width:640px;}'+
  '#cf-multas thead th{text-align:left;font-size:.68rem;text-transform:uppercase;letter-spacing:.04em;color:var(--mut);padding:10px 14px;border-bottom:1px solid var(--line);font-weight:700;}'+
  '#cf-multas tbody td{padding:11px 14px;border-bottom:1px solid var(--line);vertical-align:top;color:#33404f;}'+
  '#cf-multas tbody tr:last-child td{border-bottom:0;}'+
  '#cf-multas .cfm-st{display:inline-block;font-size:.7rem;font-weight:700;padding:2px 9px;border-radius:999px;white-space:nowrap;}'+
  '#cf-multas .cfm-st.pag{background:var(--pag-bg);color:var(--pag);}'+
  '#cf-multas .cfm-st.tram{background:var(--tram-bg);color:var(--tram);}'+
  '#cf-multas .cfm-mo{font-variant-numeric:tabular-nums;font-weight:600;white-space:nowrap;}'+
  '#cf-multas .cfm-en{max-width:340px;color:#4a5867;}'+
  '#cf-multas .cfm-more{padding:12px 18px;text-align:center;}'+
  '#cf-multas .cfm-more button{background:transparent;border:1px solid var(--line);border-radius:8px;padding:8px 16px;color:var(--acc);font-weight:700;cursor:pointer;font-family:inherit;}'+
  '#cf-multas .cfm-empty{text-align:center;padding:34px 16px;color:var(--mut);}'+
  '#cf-multas .cfm-empty b{color:var(--ink);}'+
  '#cf-multas .cfm-disc{margin:26px 2px 0;font-size:.74rem;color:#9aa7b4;line-height:1.5;text-align:center;}'+
  '@media(max-width:600px){'+
    '#cf-multas .cfm-searchbar{flex-direction:column;}'+
    '#cf-multas .cfm-searchbar button{padding:12px;}'+
    '#cf-multas .cfm-searchbar input{font-size:16px;}'+
    '#cf-multas .cfm-cardhead{padding:14px;gap:10px;}'+
    '#cf-multas .cfm-metric b{font-size:1.3rem;}'+
    /* tabla -> tarjetas apiladas */
    '#cf-multas table{min-width:0;}'+
    '#cf-multas thead{display:none;}'+
    '#cf-multas table,#cf-multas tbody,#cf-multas tr,#cf-multas td{display:block;width:100%;}'+
    '#cf-multas tbody tr{border:1px solid var(--line);border-radius:10px;margin:10px 12px;background:var(--bg);}'+
    '#cf-multas tbody td{border:0;border-bottom:1px solid var(--line);padding:9px 14px;display:flex;justify-content:space-between;align-items:baseline;gap:14px;text-align:right;}'+
    '#cf-multas tbody tr td:last-child{border-bottom:0;}'+
    '#cf-multas tbody td::before{content:attr(data-label);font-weight:700;color:var(--mut);font-size:.66rem;text-transform:uppercase;letter-spacing:.03em;flex:none;text-align:left;}'+
    '#cf-multas .cfm-en{flex-direction:column;align-items:flex-start;text-align:left;max-width:none;}'+
    '#cf-multas .cfm-en::before{margin-bottom:3px;}'+
  '}';

  var HERO = ''+
  '<h1>Multas de tu condominio</h1>'+
  '<p>Busca por el <strong>nombre</strong> o <strong>RUT</strong> de tu comunidad y revisa cada multa registrada ante la Dirección del Trabajo.</p>';

  var MARKUP = ''+
  '<div class="cfm-searchbar">'+
    '<input id="cfm-q" type="text" autocomplete="off" spellcheck="false" placeholder="Ej: Comunidad Edificio Los Aromos  ·  76.123.456-7">'+
    '<button id="cfm-btn" type="button">Buscar</button>'+
  '</div>'+
  '<div class="cfm-hint">Puedes buscar por parte del nombre o por RUT (con o sin puntos y guion).</div>'+
  '<div id="cfm-out" aria-live="polite"></div>'+
  '<p class="cfm-disc">Información basada en registros públicos de multas de la Dirección del Trabajo. La clasificación como comunidad/condominio es referencial. Si detectas un error, contáctanos.</p>';

  function injectCSS(){
    if(document.getElementById('cfm-widget-css')) return;
    var st=document.createElement('style'); st.id='cfm-widget-css'; st.textContent=CSS;
    (document.head||document.documentElement).appendChild(st);
  }

  function buildHero(){
    if(document.getElementById('cfm-rhero')) return;
    var hero=document.createElement('section'); hero.id='cfm-rhero'; hero.innerHTML=HERO;
    var anchor=document.querySelector('.div-block-961')||document.querySelector('.div-block-967');
    if(anchor && anchor.parentNode){ anchor.parentNode.insertBefore(hero, anchor); }
    else{ document.body.insertBefore(hero, document.body.firstChild); }
  }

  function mount(){
    if(document.getElementById('cf-multas')) return true; // ya montado
    var host=null, list=document.querySelectorAll('.w-embed');
    for(var i=0;i<list.length;i++){ if(!list[i].innerHTML.trim()){ host=list[i]; break; } }
    if(!host) return false;
    var wrap=document.createElement('div'); wrap.id='cf-multas'; wrap.innerHTML=MARKUP;
    host.appendChild(wrap);
    return true;
  }

  function boot(){
    injectCSS(); buildHero();
    if(!mount()) return;
    var out=document.getElementById('cfm-out');
    var input=document.getElementById('cfm-q');
    var btn=document.getElementById('cfm-btn');
    if(!out || !input || !btn) return;

    var DATA=null, INDEX=null, loading=false, shown=PAGE, lastResults=[];

    function norm(s){return (s||'').toString().toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Z0-9 ]/g,' ').replace(/\s+/g,' ').trim();}
    function normRut(s){return (s||'').toString().toUpperCase().replace(/[^0-9K]/g,'');}
    function esc(s){return (s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

    function loadData(cb){
      if(DATA){cb();return;}
      if(loading)return; loading=true;
      out.innerHTML='<div class="cfm-status">Cargando base de multas…</div>';
      fetch(DATA_URL).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
      .then(function(j){DATA=j;INDEX=j.items.map(function(it){return {it:it,sn:norm(it.nombre),sr:normRut(it.rut)};});loading=false;cb();})
      .catch(function(e){loading=false;out.innerHTML='<div class="cfm-empty"><b>No pudimos cargar la información.</b><br>Intenta nuevamente en unos segundos.</div>';console.error('cf-multas:',e);});
    }
    function search(q){
      var nq=norm(q), rq=normRut(q), terms=nq.split(' ').filter(Boolean), res=[];
      for(var i=0;i<INDEX.length;i++){var e=INDEX[i],ok=false;
        if(rq.length>=4 && e.sr.indexOf(rq)!==-1) ok=true;
        if(!ok && terms.length){ok=terms.every(function(t){return e.sn.indexOf(t)!==-1;});}
        if(ok)res.push(e.it);
      }
      res.sort(function(a,b){return b.n-a.n;});return res;
    }
    function render(){
      var q=input.value.trim();
      if(q.length<3){out.innerHTML='<div class="cfm-status">Escribe al menos 3 caracteres para buscar.</div>';return;}
      loadData(function(){lastResults=search(q);shown=PAGE;paint();});
    }
    function paint(){
      var res=lastResults;
      if(!res.length){out.innerHTML='<div class="cfm-empty"><b>No encontramos multas</b> para “'+esc(input.value.trim())+'”.<br>Prueba con otra parte del nombre o revisa el RUT.<br><br><b style="color:#127a3e">Buena noticia:</b> si tu comunidad no aparece, no registra multas en esta base.</div>';return;}
      var html='<div class="cfm-count">'+res.length+' resultado'+(res.length>1?'s':'')+'</div>';
      res.slice(0,shown).forEach(function(it,idx){html+=card(it,idx);});
      if(res.length>shown){html+='<div class="cfm-more"><button type="button" data-more="1">Ver más resultados ('+(res.length-shown)+')</button></div>';}
      out.innerHTML=html;
    }
    function card(it,idx){
      return '<div class="cfm-card" data-i="'+idx+'">'+
        '<div class="cfm-cardhead" data-toggle="1">'+
          '<div style="min-width:0;flex:1;">'+
            '<p class="cfm-nombre">'+esc(it.nombre)+'</p>'+
            '<div class="cfm-sub"><span class="cfm-badge">'+esc(it.cat)+'</span><span>RUT '+esc(it.rut)+'</span><span>'+it.pag+' pagada'+(it.pag===1?'':'s')+' · '+it.tram+' en cobranza</span></div>'+
          '</div>'+
          '<div class="cfm-metric"><b>'+it.n+'</b><span>multa'+(it.n===1?'':'s')+'</span></div>'+
          '<div class="cfm-chev">▶</div>'+
        '</div>'+
        '<div class="cfm-detail" data-detail>'+detail(it,DETAIL_PAGE)+'</div>'+
      '</div>';
    }
    function detail(it,lim){
      var rows=it.multas.slice(0,lim).map(function(m){
        var stt=m.e==='PAGADA'?'pag':'tram';
        return '<tr><td data-label="Fecha">'+esc(m.f)+'</td><td data-label="Estado"><span class="cfm-st '+stt+'">'+esc(m.e)+'</span></td><td class="cfm-mo" data-label="Monto">'+esc(m.mo)+' '+esc(m.t)+'</td><td data-label="Procedencia">'+esc(m.p)+'</td><td class="cfm-en" data-label="Infracción">'+esc(m.en)+'</td></tr>';
      }).join('');
      var extra=it.multas.length>lim?'<div class="cfm-more"><button type="button" data-detailmore="1">Ver las '+(it.multas.length-lim)+' multas restantes</button></div>':'';
      return '<div class="cfm-tablewrap"><table><thead><tr><th>Fecha</th><th>Estado</th><th>Monto</th><th>Procedencia</th><th>Infracción</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+extra;
    }

    out.addEventListener('click',function(e){
      var mb=e.target.closest('[data-more]'); if(mb){shown+=PAGE;paint();return;}
      var head=e.target.closest('[data-toggle]'); if(head){head.parentNode.classList.toggle('open');return;}
      var dm=e.target.closest('[data-detailmore]'); if(dm){var c=dm.closest('.cfm-card');var it=lastResults[+c.getAttribute('data-i')];c.querySelector('[data-detail]').innerHTML=detail(it,9999);return;}
    });
    btn.addEventListener('click',render);
    var t; input.addEventListener('input',function(){clearTimeout(t);t=setTimeout(render,220);});
    input.addEventListener('keydown',function(e){if(e.key==='Enter'){clearTimeout(t);render();}});
    try{var p=new URLSearchParams(location.search);var pre=p.get('rut')||p.get('q');if(pre){input.value=pre;render();}}catch(_){}
  }

  injectCSS(); // lo antes posible para minimizar el flash del hero viejo
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
