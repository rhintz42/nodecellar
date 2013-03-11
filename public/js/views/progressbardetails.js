window.ProgressbarView = Backbone.View.extend({

    initialize: function () {
        console.log("1");
        //$.when(
          this.render();
        //).then(
          console.log("2");
        //)
        
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        /*
        $(this.el).show(0, function() {
          this.drawProgressbar;
        });
        */
        this.onRenderComplete();
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .draw"   : "drawProgressbar",
        "click .delete" : "deleteProgressbar",
        "drop #picture" : "dropHandler"
    },
    
    onRenderComplete: function () {
    // check every 200ms to see if this.el has been injected into the DOM
        if (!$.contains(document.documentElement, this.el)) {
            var that = this;
            setTimeout(function () {
                console.log("Hey");
                that.onRenderComplete();
            }, 0);
            return;
        }

        // now proceed with code that depends on this.el being in the DOM
        //console.log($(this.el).height());
        //this.drawProgressbar();
        /*
        var c=new BoxSet();
        c.add({x:150,y:150,w:100,h:100});
        c.add({x:10,y:10,w:100,h:100});
         
        var v=new SetView({
          el:$("canvas"),
          collection :c
        });
        v.render();
        */
      var stage = new Kinetic.Stage({
        container: 'container',
        width: 578,
        height: 200
      });

      var layer = new Kinetic.Layer();
      /*
      var rect = new Kinetic.Rect({
        x: 239,
        y: 75,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });*/
      var thermometerGroup = new Kinetic.Group({
        x: 239,
        y: 75,
        draggable: false
      });
      var rect = addFillRectangle(0, 0, 100, 50, 'green', 'hello');

      var that = this;
      rect.on('mousedown', function() {
        that.drawProgressbar();
      });
      thermometerGroup.add(rect);
      layer.add(thermometerGroup);
      // add the shape to the layer
      //layer.add(rect);

      // add the layer to the stage
      stage.add(layer);
    },
    
    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveProgressbar();
        return false;
    },

    saveProgressbar: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                alert("My First JavaScript");
                self.render();
                app.navigate('progressbars/' + model.id, false);
                utils.showAlert('Success!', 'Progressbar saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    drawProgressbar: function () {
        console.log("Hello");
        utils.showAlert('Success!', 'Progressbar saved successfully', 'alert-success');
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.fillStyle="#ff0000";
        ctx.fillRect(0,0,150,150);
        return false;
    },

    deleteProgressbar: function () {
        this.model.destroy({
            success: function () {
                alert('Progressbar deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});

window.Box = Backbone.Model.extend({
defaults: {
x: 0,
y: 0,
w: 1,
h: 1,
color: "#FF9000",
linewidth: 3
}
});

window.BoxSet = Backbone.Collection.extend({
model:Box 
});

window.BoxView= Backbone.View.extend({
render : function() {
var model=this.model, ctx=this.options.ctx;

ctx.fillStyle = "#FF9000";
ctx.globalAlpha = 0.1;
ctx.fillRect(model.get("x"), model.get("y"), model.get("w"), model.get("h")); //transparent box in the back
ctx.globalAlpha = 1;
ctx.strokeStyle = model.get("color");
ctx.lineWidth = model.get("linewidth");
ctx.strokeRect(model.get("x"), model.get("y"), model.get("w"), model.get("h")); //rectangle on top  
}
});

window.SetView= Backbone.View.extend({
render: function() {
var ctx=this.$el.get(0).getContext("2d");
 
this.collection.each(function(model) {
var view=new BoxView({ctx:ctx,model:model});
view.render();            
})
}
});


