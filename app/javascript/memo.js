function memo() {
  const submit = document.getElementById("submit");
  //index.html.erbのgetElementByIdを用いて「投稿する」ボタンの情報を取得する。
  submit.addEventListener("click", (e) => {
  //投稿するボタンを「click」した場合に実行される関数を定義
    const formData = new FormData(document.getElementById("form"));
    //メモ投稿のフォームに入力された情報をXHR.sendと共に送信
    const XHR = new XMLHttpRequest();  
    //非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true);  
    //リクエストの内容を引数へ追記(HTTPメソッドはPOST、パスは/posts、非同期通信はtrueと設定)
    XHR.responseType = "json";
    //返却されるデータ形式はJSON
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      //200以外のHTTPステータスが返却された場合の処理
      const item = XHR.response.post;
      //レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");
      //HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content");
      //formTextを取得する理由：メモの入力フォームをリセットするため。
      //この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、
      //リセットする必要がある。
      //ここではリセット対象の要素であるcontentという要素を取得している。
      //↓「メモとして描画する部分のHTML」を定義,定義したHTMLが描画される
      const HTML = ` 
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content} 
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      //listという要素に対して、insertAdjacentHTMLでHTMLを追加。
      //第一引数にafterendを指定することで、要素listの直後に挿入できる。
      formText.value = "";
      //「メモの入力フォームに入力されたままの文字」はリセットされる。
      //正確には、空の文字列に上書きされるような仕組。
    };
    e.preventDefault();
    //プログラム本来の処理を、止めるため
  });
}
window.addEventListener("load", memo); 
//既読機能と同様にwindow（ページ）をload（読み込み）時に実行される