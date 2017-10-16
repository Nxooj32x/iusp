define(function(require,exports,module){
    'use strict';
    var div = require('view/div');
    var classie = require('util/classie');
    var plan = document.querySelector('.plan');

    function init() {
        initEvents();
    }

    function initEvents() {
        var  planseats = [].slice.call(plan.querySelectorAll('.row__seat'));
        var onSeatSelect = function(ev) { selectSeat(ev.target); };
        planseats.forEach(function(planseat) {
            planseat.addEventListener('click', onSeatSelect);
        });
    }
    function selectSeat(planseat) {
        if( classie.has(planseat, 'row__seat--reserved') ) {
            return false;
        }
        if( classie.has(planseat, 'row__seat--selected') ) {
            classie.remove(planseat, 'row__seat--selected');
            return false;
        }
        classie.add(planseat, 'row__seat--selected');
    }

    var body = document.body;
    imagesLoaded(body,function(){
        var querySelector = document.querySelector('#j-rows');
        querySelector.innerHTML=div.divStr;
        init();
        body.classList.remove('loading');
        classie.add(plan, 'plan--shown');
    });

});