// jshint esversion: 6

QUnit.config.reorder = false;

var itemId;

QUnit.module( "AJAX-CRUD Test" );
QUnit.test( "AJAX post ", function( assert ) {

  // note the function call done(); below after all async work completed
  var done = assert.async();

  var createDone = false;
  $.ajax({
    url: "/item", // URL der Abfrage,
    data: {foo: "bar"},
    type: "POST"
  })
  .done (function( response) {
    createDone = true;
    itemId = response._id;
    assert.ok( undefined !== itemId, "create id: " + itemId);
  })
  .fail (function( xhr, status, errorThrown ) {
    assert.ok(false, "create route failed, error: " + errorThrown);
  })
  .always (function( xhr, status ) {
    assert.ok(createDone, "ajax done with response...");
    done();
  });

});
QUnit.test( "AJAX get", function( assert ) {

    // note the function call done(); below after all async work completed
    var done = assert.async();

    var readDone = false;
    $.ajax({
      url: "/item", // URL der Abfrage,
      data: {_id: itemId},
      type: "GET"
    })
    .done (function( response) {
      readDone = true;
      assert.ok( undefined!==response._id && response._id===itemId, "id found");
    })
    .fail (function( xhr, status, errorThrown ) {
      assert.ok(false, "read route failed, error: " + errorThrown);
    })
    .always (function( xhr, status ) {
      assert.ok(readDone, "ajax done with response...");
      done();
    });

});
QUnit.test( "AJAX put", function( assert ) {

  assert.ok(false, "test not implemented...");
  done();

});

QUnit.test( "AJAX delete", function( assert ) {
  // note the function call done(); below after all async work completed
  var done = assert.async();

  var updateDone = false;
  $.ajax({
    url: "/item?_id=" +itemId, // URL der Abfrage,
    type: "DELETE"
  })
  .done (function( response) {
    updateDone = true;
    assert.ok( undefined!==response._id && response._id===itemId, "id found");
  })
  .fail (function( xhr, status, errorThrown ) {
    assert.ok(false, "delete route failed, error: " + errorThrown);
  })
  .always (function( xhr, status ) {
    assert.ok(updateDone, "ajax done with response...");
    done();
  });

});
