/* Muro HubSpot -> buscador de multas (administradoreschile.cl)
   AUTO-MONTANTE: inyecta el formulario HubSpot en el primer Embed vacío (.w-embed) de la página
   y, al enviarlo, redirige a /multas-dt-resultado?q=<n__de_rut>.
   Cargar como <script src> en el custom code (footer) de la página del muro. */
(function(){
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
    if(window.hbspt && window.hbspt.forms){ createForm(); return; }
    var s=document.createElement('script');
    s.src="//js.hsforms.net/forms/embed/v2.js"; s.charset="utf-8";
    s.onload=createForm;
    document.body.appendChild(s);
  }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
