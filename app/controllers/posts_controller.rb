class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked   #post.checked:既読であるか否かを判定するプロパティ
      post.update(checked: false)  #既読であれば「既読を解除するためにfalseへ変更」
    else
      post.update(checked: true)   #既読でなければ「既読にするためtrueへ変更」
    end

    item = Post.find(params[:id])  #更新したレコードを取得
    render json: { post: item }    #JSON形式（データ）としてchecked.jsに返却
  end
end