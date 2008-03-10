var ok_sheet
var login_sheet
var library_window

var Patches = []

var toogle_library_window = function() {
  var width   = 400
  var height  = 300 
  var spacing = 20

  UI.Window.setOptions({
   show: function(el) { el.appear({ duration: 0.2 }) },
   hide: function(el) { el.fade({ duration: 0.2 }) }
  });

  if (library_window == undefined) {    
    library_window = new UI.Window({ 
      parent: 'container',
      theme: "black_hud", 
      resizable: true,
      id: 'library',
      shadow:false,
      height: 300,
      top: 200,
      width: 250, 
      left: 800, 
      superflousEffects: true,  
    }).setContent($('tools').innerHTML).setZIndex(1000).show()
  } else {
    if (library_window.getPosition().top < 0) {
      library_window.setPosition(10, library_window.getPosition().left)
    }
    library_window.visible ? library_window.hide() : library_window.show()    
  }
}



var init_tooltips = function() {
  var options = { 
      effect: 'appear', 
      hideAfter: true, 
      className: 'graphpipes', 
      fixed: true,
      delay: 0.9,
      hook: { target: 'bottomLeft', 
             tip: 'topLeft', 
             offset: {x: 5, y:5}
      }
  }
  
  $$('*[tooltip]').each( function(input) {
    var t = new Tip(input, input.readAttribute('tooltip'), options)
  });

}

var error = function(error) {
  error = error || 'Sorry! This Feature is not implemented yet.'
  $$('div.message h5').each(function(h) {
    h.innerHTML = error
  })
  
  ok_sheet.show()
}

Event.observe(window, 'dom:loaded', function() {

  ok_sheet = new Sheet($("dummy_sheet"))
  login_sheet = new Sheet($("login_sheet"))

  toogle_library_window()

  init_tooltips()
  
  $$('li.test_button').each(function(button) {
    button.observe('click', function() {
      Patches.push(new Patch(button))
    })
  })
  
   jsBox.jsBoxLayer = new WireIt.Layer({

      containers: [
         {xtype: jsBox, position: [300,250], codeText: "function() {\n return 'graph';\n}"},
         {xtype: jsBox, position: [530,250], codeText: "function() {\n return 'pipes';\n}"},
         {xtype: jsBox, position: [430,380], codeText: "function(a,b) {\n   return a + b;\n}"},
         {xtype: jsBox, position: [500,540], codeText: "function(result) {\n error('The result is: ' + result)}"}
      ],
      
      wires: [
         {src: {moduleId: 0, terminalId: 0}, tgt: {moduleId: 2, terminalId: 0}},
         {src: {moduleId: 1, terminalId: 0}, tgt: {moduleId: 2, terminalId: 1}},
         {src: {moduleId: 2, terminalId: 2}, tgt: {moduleId: 3, terminalId: 0}}
      ]
      
   });
})