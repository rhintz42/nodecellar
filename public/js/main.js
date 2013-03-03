var AppRouter = Backbone.Router.extend({

    routes: {
        ""                        : "home",
        "wines"	                  : "list",
        "wines/page/:page"	      : "list",
        "progressbars/add"        : "addProgressbar",
        "wines/add"               : "addWine",
        "wines/:id"               : "wineDetails",
        "progressbars/:id"        : "progressbarDetails",
        "progressbars"            : "progressbarList",
        "progressbars/page/:page"	: "progressbarList",
        "about"                   : "about"
    
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	  list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	  addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	  },
	  
    progressbarList: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var progressbarList = new ProgressbarCollection();
        progressbarList.fetch({success: function(){
            $("#content").html(new ProgressbarListView({model: progressbarList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    progressbarDetails: function (id) {
        var progressbar = new Progressbar({_id: id});
        progressbar.fetch({success: function(){
            $("#content").html(new ProgressbarView({model: progressbar}).el);
        }});
        this.headerView.selectMenuItem();
    },

	  addProgressbar: function() {
        var progressbar = new Progressbar();
        $('#content').html(new ProgressbarView({model: progressbar}).el);
        this.headerView.selectMenuItem('add-menu');
	  },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 'WineListItemView', 'ProgressbarView', 'ProgressbarListItemView','AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
