function check() {  //DOMの取得からエンドポイントへのリクエストなどは、すべてこのcheck関数へ記述することにする
  const posts = document.querySelectorAll(".post");  /*postというクラス名を持つ要素はメモの数だけ存在する。
                                                       querySelectorAllメソッドで、postをクラス名にもつ要素を取得可能。*/
  posts.forEach(function (post) {   //要素1つずつに対して、「クリック」した際に動作する処理
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {  //「要素1つずつに対して、『クリック』した際に動作するイベント駆動」を設定
      const postId = post.getAttribute("data-id");  //getAttributeで属性値を取得可能、メモのidを取得する
      const XHR = new XMLHttpRequest();  //エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行う。
      XHR.open("GET", `/posts/${postId}`, true);  //openメソッドを使用してリクエストの詳細を指定する。
      XHR.responseType = "json";  //responseTypeメソッドを使用して、レスポンスの形式を指定
      XHR.send(); //設定した情報をサーバーサイドへ送信
      XHR.onload = () => {
        if (XHR.status != 200) {  /*HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理が行われる。
          XHR.statusTextによって、エラーが生じたオブジェクトに含まれるエラーメッセージが表示される。*/
          alert(`Error ${XHR.status}: ${XHR.statusText}`); //return null;によってJavaScriptの処理から抜け出すことができます
          return null;                       //これはエラーが出た場合に、15行目以降に記述されている処理を行わないようにすることが目的.
        }
        const item = XHR.response.post;  //レスポンスされてきたJSONにアクセス可能
        if (item.checked === true) {     //checkedアクションで返却したitemは、XHR.response.postで取得可能
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}                                                   
setInterval(check, 1000);  //check関数が1秒に1度実行