/* Muro HubSpot -> buscador de multas (administradoreschile.cl)
   AUTO-MONTANTE: inyecta el formulario HubSpot en el primer Embed vacío (.w-embed),
   sube el form sobre el fold, aplica Montserrat, corrige textos y pule mobile.
   Al enviar, redirige a /multas-dt-resultado?q=<n__de_rut>. */
(function(){
  var CSS = ''+
  "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');"+
  /* Montserrat en toda la sección de la herramienta */
  ".div-block-967,.div-block-967 *{font-family:'Montserrat',Arial,sans-serif !important;}"+
  /* Subir el form: compactar paddings del hero y del bloque del form */
  ".div-block-967{padding-top:22px !important;padding-bottom:26px !important;}"+
  ".div-block-970{padding-top:4px !important;padding-bottom:8px !important;}"+
  ".div-block-967 h1{margin-bottom:10px !important;line-height:1.15 !important;}"+
  /* Contenedor del form: centrado y ancho cómodo */
  "#hs-multas-form{max-width:560px;margin:0 auto;}"+
  "#hs-multas-form iframe{width:100% !important;}"+
  "@media(max-width:767px){"+
    ".div-block-967{padding-top:14px !important;padding-bottom:18px !important;}"+
    ".div-block-968{padding-left:16px !important;padding-right:16px !important;}"+
    ".div-block-967 h1{font-size:1.6rem !important;}"+
  "}";

  function injectCSS(){
    if(document.getElementById('cfm-form-css')) return;
    var st=document.createElement('style'); st.id='cfm-form-css'; st.textContent=CSS; document.head.appendChild(st);
  }

  // Corrige textos heredados del cotizador
  function fixCopy(){
    var repl=[
      ['Encuentra al próximo administrador para tu condominio o edificio',
       'Consulta gratis y en segundos las multas laborales de tu comunidad.'],
      ['Cotizador para Comunidades','Déjanos tus datos y accede al buscador'],
      ['Trabajamos con Administradores y Empresas de Administración profesionales',
       'Información basada en registros públicos de la Dirección del Trabajo']
    ];
    var walker=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n, nodes=[];
    while((n=walker.nextNode())) nodes.push(n);
    nodes.forEach(function(node){
      var t=node.nodeValue; if(!t) return; var tt=t.trim();
      for(var i=0;i<repl.length;i++){ if(tt===repl[i][0]){ node.nodeValue=t.replace(repl[i][0],repl[i][1]); } }
    });
  }

  function styleIframe(){
    var f=document.querySelector('#hs-multas-form iframe');
    if(!f) return;
    try{
      var d=f.contentDocument||f.contentWindow.document; if(!d) return;
      if(d.getElementById('cfm-hs-font')) return;
      var s=d.createElement('style'); s.id='cfm-hs-font';
      s.textContent="@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');"+
        "body,input,select,textarea,button,label,.hs-form,.hs-button{font-family:'Montserrat',Arial,sans-serif !important;}";
      (d.head||d.documentElement).appendChild(s);
    }catch(_){}
  }

  function mount(){
    if(document.getElementById('hs-multas-form')) return document.getElementById('hs-multas-form');
    var host=null, list=document.querySelectorAll('.w-embed');
    for(var i=0;i<list.length;i++){ if(!list[i].innerHTML.trim()){ host=list[i]; break; } }
    if(!host) return null;
    var d=document.createElement('div'); d.id='hs-multas-form'; host.appendChild(d);
    return d;
  }

  function createForm(){
    if(!window.hbspt || !window.hbspt.forms) return;
    if(!mount()) return;
    window.hbspt.forms.create({
      portalId: "6977629",
      formId: "7690f11d-6e1c-4ac5-a74c-2d5ccee2e009",
      region: "na1",
      target: "#hs-multas-form",
      onFormReady: function(){ setTimeout(styleIframe, 150); setTimeout(styleIframe, 800); },
      onFormSubmit: function($form){
        try{ var el=$form.find('input[name="n__de_rut"]'); window.__cfmQ=(el && el.val)?el.val():''; }catch(_){ window.__cfmQ=''; }
      },
      onFormSubmitted: function(){
        var q=(window.__cfmQ||'').trim();
        window.location.href="/multas-dt-resultado"+(q?("?q="+encodeURIComponent(q)):"");
      }
    });
  }

  function boot(){
    injectCSS(); fixCopy();
    if(window.hbspt && window.hbspt.forms){ createForm(); return; }
    var s=document.createElement('script');
    s.src="//js.hsforms.net/forms/embed/v2.js"; s.charset="utf-8";
    s.onload=createForm;
    document.body.appendChild(s);
  }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
