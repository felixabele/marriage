var Fieldbook = new function() {

  // -------------------------
  // 	Settings
  // -------------------------
  var obj = this;

  this.create = function(record, success, error) {
    $.ajax({
      url: (window.location.href.match(/localhost/) ? 'http://localhost:3000/' : 'https://fieldbook-proxy.herokuapp.com/'),
      data: record,
      type: 'POST',
      dataType: 'json',
      success: function (data) {
        success(data);
      },
      error: function (data) {
        error(data);
      }
    });
  };
}; // END
