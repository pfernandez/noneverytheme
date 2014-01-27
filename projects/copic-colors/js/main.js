requirejs.config({
    baseUrl: 'js/lib',

    paths: {
        main: '../main'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
    }
});

// Start the main app logic.
requirejs( ['jquery', 'backbone', 'main/colors'],
function( $, Backbone, colors ) {

    var palette = new Backbone.Collection(colors);
    var colorGroup = 'Earth';
    var subPalette = palette.where({ family: colorGroup });
    var page = $('#color-box');

    ColorView = Backbone.View.extend({
    
        properties: {
            color_class: '',
            color_name: '',
            color_hex: '',
            color_red: '',
            color_green: '',
            color_blue: '',
        },
    
        initialize: function(options) {
            if(this.options.properties)
                this.properties = this.options.properties;
            this.render();
        },
        
        render: function() {
            var template = _.template( $("#color_template").html(), this.properties );
            
            console.log(this.properties);
            
            this.$el.html( template );
            return this;
        },
        
        events: {
            'mouseenter .color': 'enterColor',
            'mouseleave .color': 'leaveColor'
        },
        
        enterColor: function() {
            this.$el.find('span').fadeIn(100);
        },
        
        leaveColor: function() {
            this.$el.find('span').fadeOut(10);
        },
    });

    $('h1').text(colorGroup);

    // Iterate through all of the colors in the palette.
    for(var i = 0; i < subPalette.length; i++) {
        var color = subPalette[i];
        
        // Create a container for our color element and append it to the page.
        var colorWrap = document.createElement('div');
        $(colorWrap).addClass('color-wrap').appendTo(page);
        
        // Instantiate the color element as a Backbone view.
        var colorView = new ColorView({
            el: $(colorWrap),
            properties: {
                color_class: color.get('classification'),
                color_name: color.get('name'),
                color_hex: color.get('hex'),
                color_red: color.get('red'),
                color_green: color.get('green'),
                color_blue: color.get('blue'),
            },
        });
    }
    
});