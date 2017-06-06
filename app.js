const refreshButton = jQuery('#refresh');

let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

let requestStream = refreshClickStream.startWith('startup click')
  .map(function () {
    const randomOffset = Math.floor(Math.random() * 500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

let responseStream = requestStream.flatMap(function (requestUrl) {
  return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
});

const followSection = jQuery('#follow');

responseStream.subscribe(function (response) {
  followSection.empty();
  response.slice(-3).forEach(function (data) {
    const html = '<article>\
      <img src=' + data.avatar_url + ' />\
      <h2>' + data.login + '</h2>\
      <span>X</span>\
    </article>';

    followSection.append(html);
  });
});

// let requestStream = Rx.Observable.merge(
//   requestOnRefreshStream, startupRequestStream
// );

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
