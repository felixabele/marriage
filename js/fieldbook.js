var Fieldbook = new function() {

  // -------------------------
  // 	Settings
  // -------------------------
  var obj = this;

  this.create = function(record, success, error) {
    $.ajax({
      url: 'https://fieldbook-proxy.herokuapp.com/',
      data: record,
      type: 'POST',
      dataType: 'json',
      success: function (data) {
        console.log('success', data);
        success(data);
      },
      error: function (data) {
        console.log('error', data);
        error(data);
      }
    });
  };
}; // END
