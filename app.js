let requestStream = Rx.Observable.of('https://api.github.com/users');

let responseStream = requestStream.flatMap(function (requestUrl) {
  return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
});

responseStream.subscribe(function (response) {
  response.slice(-3).forEach(function (data) {
    const html = '<article>\
      <img src=' + data.avatar_url + ' />\
      <h2>' + data.login + '</h2>\
      <span>X</span>\
    </article>';

    jQuery('#follow').append(html);
  });
});

// requestStream.subscribe(function (requestUrl) {
//   let responseStream = Rx.Observable.create(function (observer) {
//     jQuery.getJSON(requestUrl)
//       .done(function (response) { observer.onNext(response); })
//       .fail(function (jqXHR, status, error) { observer.onError(error); })
//       .always(function () { observer.onCompleted(); });
//   });

//   responseStream.subscribe(function (response) {

//   });
// });
