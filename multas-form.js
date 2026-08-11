/* Landing del buscador de multas — administradoreschile.cl/multas-dt
   AUTO-MONTANTE: oculta las secciones heredadas del cotizador y construye una landing
   de conversión: hero 2 columnas (propuesta de valor izquierda / form HubSpot derecha)
   + franja "¿Cómo funciona?". Al enviar el form redirige a /multas-dt-resultado?q=<n__de_rut>. */
(function(){
  var PORTAL_ID = "6977629";
  var FORM_ID = "7690f11d-6e1c-4ac5-a74c-2d5ccee2e009";
  var RESULT_URL = "/multas-dt-resultado";

  var CSS = ''+
  "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');"+
  /* ocultar secciones heredadas del cotizador (hero con foto, form viejo, franja redundante) */
  ".div-block-961,.div-block-967,.div-block-962{display:none !important;}"+

  /* ===== HERO ===== */
  "#cfm-landing{font-family:'Montserrat',Arial,sans-serif;background:linear-gradient(155deg,#3B2AB1 0%,#4B39C9 48%,#241B7E 100%);color:#fff;padding:150px 24px 56px;}"+
  "#cfm-landing *{box-sizing:border-box;}"+
  "#cfm-landing .cfm-wrap{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.05fr) 420px;grid-template-areas:'top form' 'bottom form';column-gap:56px;row-gap:8px;align-items:start;}"+
  "#cfm-landing .cfm-top{grid-area:top;}"+
  "#cfm-landing .cfm-bottom{grid-area:bottom;align-self:end;}"+
  "#cfm-landing .cfm-form{grid-area:form;}"+
  "#cfm-landing .cfm-badge{display:inline-block;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.28);padding:6px 14px;border-radius:999px;font-size:.78rem;font-weight:600;letter-spacing:.02em;margin-bottom:18px;}"+
  "#cfm-landing h1{font-size:2.5rem;line-height:1.14;font-weight:800;margin:0 0 14px;color:#fff;}"+
  "#cfm-landing .cfm-lead{font-size:1.08rem;line-height:1.55;color:rgba(255,255,255,.88);margin:0;max-width:34em;}"+
  "#cfm-landing .cfm-checks{list-style:none;padding:0;margin:26px 0 0;display:flex;flex-direction:column;gap:12px;}"+
  "#cfm-landing .cfm-checks li{display:flex;gap:11px;align-items:flex-start;font-size:.97rem;color:rgba(255,255,255,.93);line-height:1.45;}"+
  "#cfm-landing .cfm-checks .ic{flex:none;width:22px;height:22px;border-radius:50%;background:#22C55E;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:800;color:#fff;margin-top:1px;}"+
  "#cfm-landing .cfm-src{margin:20px 0 0;font-size:.75rem;color:rgba(255,255,255,.55);}"+

  /* card del formulario */
  "#cfm-landing .cfm-card{background:#fff;border-radius:18px;box-shadow:0 24px 64px rgba(10,8,40,.38);padding:26px 26px 16px;color:#1c2430;}"+
  "#cfm-landing .cfm-card h3{margin:0 0 6px;font-size:1.22rem;font-weight:800;color:#1c2430;}"+
  "#cfm-landing .cfm-card .cfm-sub{margin:0 0 16px;font-size:.88rem;color:#5c6b7a;line-height:1.5;}"+
  "#hs-multas-form iframe{width:100% !important;}"+
  "#cfm-landing .cfm-loading{padding:26px 0;text-align:center;color:#8a96a3;font-size:.9rem;}"+
  "#cfm-landing .cfm-note{font-size:.72rem;color:#9aa7b4;text-align:center;margin:12px 0 6px;line-height:1.45;}"+

  /* ===== FRANJA CÓMO FUNCIONA ===== */
  "#cfm-steps{font-family:'Montserrat',Arial,sans-serif;background:#F6F7FC;padding:56px 24px;}"+
  "#cfm-steps *{box-sizing:border-box;}"+
  "#cfm-steps .cfm-steps-wrap{max-width:1120px;margin:0 auto;}"+
  "#cfm-steps h2{text-align:center;font-size:1.55rem;font-weight:800;color:#1c2430;margin:0 0 32px;}"+
  "#cfm-steps .cfm-steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}"+
  "#cfm-steps .cfm-step{background:#fff;border:1px solid #E7EAF3;border-radius:14px;padding:24px;}"+
  "#cfm-steps .num{width:34px;height:34px;border-radius:10px;background:#3B2AB1;color:#fff;font-weight:800;font-size:.95rem;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}"+
  "#cfm-steps h4{margin:0 0 6px;font-size:1rem;font-weight:700;color:#1c2430;}"+
  "#cfm-steps p{margin:0;font-size:.87rem;color:#5c6b7a;line-height:1.55;}"+

  /* ===== MOBILE ===== */
  "@media(max-width:900px){"+
    "#cfm-landing{padding:104px 18px 40px;}"+
    "#cfm-landing .cfm-wrap{grid-template-columns:1fr;grid-template-areas:'top' 'form' 'bottom';row-gap:22px;}"+
    "#cfm-landing h1{font-size:1.72rem;}"+
    "#cfm-landing .cfm-lead{font-size:.98rem;}"+
    "#cfm-landing .cfm-badge{font-size:.7rem;}"+
    "#cfm-landing .cfm-card{padding:20px 18px 12px;border-radius:14px;}"+
    "#cfm-steps{padding:40px 18px;}"+
    "#cfm-steps .cfm-steps-grid{grid-template-columns:1fr;gap:14px;}"+
    "#cfm-steps h2{font-size:1.3rem;margin-bottom:22px;}"+
  "}";

  var HERO = ''+
  '<div class="cfm-wrap">'+
    '<div class="cfm-top">'+
      '<span class="cfm-badge">100% gratis · Datos oficiales de la Dirección del Trabajo</span>'+
      '<h1>¿Tu condominio tiene multas de la Dirección del Trabajo?</h1>'+
      '<p class="cfm-lead">Revísalo en segundos: busca por nombre o RUT y conoce el detalle de cada multa laboral registrada a nombre de tu comunidad.</p>'+
    '</div>'+
    '<div class="cfm-form">'+
      '<div class="cfm-card">'+
        '<h3>Accede gratis al buscador</h3>'+
        '<p class="cfm-sub">Completa tus datos y revisa de inmediato las multas de tu comunidad.</p>'+
        '<div id="hs-multas-form"><div class="cfm-loading">Cargando formulario…</div></div>'+
        '<p class="cfm-note">Usamos tus datos solo para darte acceso al buscador.</p>'+
      '</div>'+
    '</div>'+
    '<div class="cfm-bottom">'+
      '<ul class="cfm-checks">'+
        '<li><span class="ic">✓</span>Más de 10.000 multas de 3.800+ comunidades chilenas</li>'+
        '<li><span class="ic">✓</span>Detalle completo: monto, fecha, estado de pago y motivo</li>'+
        '<li><span class="ic">✓</span>Resultados al instante, sin costo</li>'+
      '</ul>'+
      '<p class="cfm-src">Fuente: registros públicos de multas de la Dirección del Trabajo.</p>'+
    '</div>'+
  '</div>';

  var STEPS = ''+
  '<div class="cfm-steps-wrap">'+
    '<h2>¿Cómo funciona?</h2>'+
    '<div class="cfm-steps-grid">'+
      '<div class="cfm-step"><div class="num">1</div><h4>Deja tus datos</h4><p>Completa el formulario con tu nombre, correo y el RUT de tu comunidad.</p></div>'+
      '<div class="cfm-step"><div class="num">2</div><h4>Busca tu comunidad</h4><p>Entras directo al buscador, con tu comunidad ya precargada.</p></div>'+
      '<div class="cfm-step"><div class="num">3</div><h4>Revisa cada multa</h4><p>Monto, fecha, estado de pago y el motivo de cada infracción laboral.</p></div>'+
    '</div>'+
  '</div>';

  function injectCSS(){
    if(document.getElementById('cfm-landing-css')) return;
    var st=document.createElement('style'); st.id='cfm-landing-css'; st.textContent=CSS;
    (document.head||document.documentElement).appendChild(st);
  }

  function buildLanding(){
    if(document.getElementById('cfm-landing')) return;
    var hero=document.createElement('section'); hero.id='cfm-landing'; hero.innerHTML=HERO;
    var steps=document.createElement('section'); steps.id='cfm-steps'; steps.innerHTML=STEPS;
    var anchor=document.querySelector('.div-block-961');
    if(anchor && anchor.parentNode){
      anchor.parentNode.insertBefore(hero, anchor);
      anchor.parentNode.insertBefore(steps, anchor);
    }else{
      document.body.insertBefore(steps, document.body.firstChild);
      document.body.insertBefore(hero, steps);
    }
  }

  /* Estilos dentro del iframe de HubSpot (same-origin) + CTA fuerte */
  function styleIframe(){
    var f=document.querySelector('#hs-multas-form iframe');
    if(!f) return;
    try{
      var d=f.contentDocument||f.contentWindow.document; if(!d) return;
      if(!d.getElementById('cfm-hs-css')){
        var s=d.createElement('style'); s.id='cfm-hs-css';
        s.textContent=""+
          "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');"+
          "body{font-family:'Montserrat',Arial,sans-serif !important;margin:0;}"+
          "body *{font-family:'Montserrat',Arial,sans-serif !important;}"+
          ".hs-form-field{margin-bottom:13px;}"+
          ".hs-form-field>label{font-size:.78rem;font-weight:600;color:#33404f;margin-bottom:4px;display:block;}"+
          "input.hs-input:not([type=checkbox]):not([type=radio]),select.hs-input,textarea.hs-input{width:100% !important;padding:11px 12px;border:1px solid #D8DCE6;border-radius:8px;font-size:.93rem;background:#fff;color:#1c2430;}"+
          "input.hs-input:focus,select.hs-input:focus{outline:none;border-color:#3B2AB1;box-shadow:0 0 0 3px rgba(59,42,177,.13);}"+
          ".hs-button{width:100%;background:#3B2AB1 !important;color:#fff !important;border:0;border-radius:10px;padding:14px;font-size:.98rem;font-weight:700;cursor:pointer;}"+
          ".hs-button:hover{background:#2A1D8F !important;}"+
          ".hs-error-msg,.hs-error-msgs label{color:#C0392B;font-size:.73rem;}"+
          ".legal-consent-container,.legal-consent-container p,.legal-consent-container label{font-size:.72rem !important;color:#7A8694;line-height:1.4;}";
        (d.head||d.documentElement).appendChild(s);
      }
      var b=d.querySelector('.hs-button');
      if(b && !b.getAttribute('data-cfm')){
        b.setAttribute('data-cfm','1');
        if(b.tagName==='INPUT'){ b.value='Ver las multas de mi comunidad'; }
        else{ b.textContent='Ver las multas de mi comunidad'; }
      }
    }catch(_){}
  }

  function removeLoading(){
    var l=document.querySelector('#hs-multas-form .cfm-loading');
    if(l) l.remove();
  }

  function createForm(){
    if(!window.hbspt || !window.hbspt.forms) return;
    if(!document.getElementById('hs-multas-form')) return;
    window.hbspt.forms.create({
      portalId: PORTAL_ID,
      formId: FORM_ID,
      region: "na1",
      target: "#hs-multas-form",
      onFormReady: function(){
        removeLoading();
        setTimeout(styleIframe, 120);
        setTimeout(styleIframe, 700);
        setTimeout(styleIframe, 2000);
      },
      onFormSubmit: function($form){
        try{ var el=$form.find('input[name="n__de_rut"]'); window.__cfmQ=(el && el.val)?el.val():''; }catch(_){ window.__cfmQ=''; }
      },
      onFormSubmitted: function(){
        var q=(window.__cfmQ||'').trim();
        window.location.href=RESULT_URL+(q?("?q="+encodeURIComponent(q)):"");
      }
    });
  }

  function boot(){
    buildLanding();
    if(window.hbspt && window.hbspt.forms){ createForm(); return; }
    var s=document.createElement('script');
    s.src="//js.hsforms.net/forms/embed/v2.js"; s.charset="utf-8";
    s.onload=createForm;
    s.onerror=function(){
      var m=document.querySelector('#hs-multas-form .cfm-loading');
      if(m) m.textContent='No pudimos cargar el formulario. Recarga la página e intenta de nuevo.';
    };
    document.body.appendChild(s);
  }

  injectCSS(); // lo antes posible para minimizar el flash del hero viejo
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
