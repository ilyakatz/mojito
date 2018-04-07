function AddCustomDateFilterBtn(){
    var label='Date Range: ';
    var button='<a class="btn btn-hollow btn-sm date-range between" title="Apply this date filter" >Apply Filter</a>';
    var fields='<input type="text" id="start" placeholder="Start Date" /><input type="text" id="end" placeholder="End Date" />';
    var tpl = label+fields+button;
    $('controls-top').insertAdjacentHTML("beforeend", tpl);

    document
      .querySelector(".btn.date-range")
      .addEventListener("click", function(){
        applyFilter();
    });

    var picker = new Pikaday({
        field: document.getElementById('start'),
        firstDay: 1,
        minDate: new Date('2006-01-01'),
        format:'L',
        yearRange: [2006,2037],
        onSelect: function() {
            picker2.setMinDate(this.getDate());
            $('start').value=this.toString('L');
        }
    });
    var picker2 = new Pikaday({
        field: document.getElementById('end'),
        firstDay: 1,
        minDate: new Date('2006-01-01'),
        format:'L',
        yearRange: [2006,2037],
        onSelect: function() {
            picker.setMaxDate(this.getDate());
            $('end').value=this.toString('L');
        }
    });
}

function getCustomRange(){
    var start=$('start').value;
    var end = $('end').value;
    return {
      startDate:start,
      endDate:end
    }
}

function applyFilter(){
  date = getCustomRange();
  debugger;
}

function parseFilterFromUrl(){
    var thisHash=window.location.hash;

    var filter=null;
    if(thisHash.indexOf("#location")!=-1){
        //There is already a filter applied, we need to parse it and preserve it
        var location = decodeURIComponent(thisHash.replace('#location:', ''));
        filter = JSON.parse(location);
        filter.filterType = filter.typeFilter || '';
    }
    return filter
}

//Code to add date range buttons
(function () {
    if (window.location.href.indexOf('transaction.event') == -1) {    return;    }
    var target = document.getElementById('body-mint');
    var observer = new window.MutationObserver(function (mutations) {
        var transactionControls = $('controls-top');
        var hasButtons=document.querySelectorAll('a.date-range').length>0;
        if (transactionControls != undefined && !hasButtons ) {
            AddCustomDateFilterBtn();
            observer.hasTransactions=true;
            observer.disconnect();
        }
    });
    observer.observe(target, { childList: true, subtree: true });
})();
