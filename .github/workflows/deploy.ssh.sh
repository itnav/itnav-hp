# 前提: 実行元のサーバーは GitHub に対する SSH 公開鍵を登録している前提です。

# Application ディレクトリを作成
mkdir -p $APP_DIR

# Git の設定
if [ -d "$APP_DIR/.git" ]; then
	echo -e "\n[Updating the "$APP_DIR" repository.]"

	# 作業先へ移動
	cd $APP_DIR
	git checkout $GITHUB_BRANCH_NAME

	# 最新の状態を取り込み上書き
	git fetch origin $GITHUB_BRANCH_NAME
	git reset --hard origin/$GITHUB_BRANCH_NAME

else
	echo -e "\n[Cloning the "$GITHUB_REPOSITORY_NAME" repository.]"

	# Git リポジトリをクローン
	git clone git@github.com:$GITHUB_REPOSITORY_NAME.git $APP_DIR

	# 作業先へ移動
	cd $APP_DIR
	git checkout $GITHUB_BRANCH_NAME

fi

# 環境変数ファイルの生成
echo -e "\n[Generating the .env file.]"
echo "$APP_ENV" > .env

# アプリケーションを Build
echo -e "\n[Building and running the Docker Compose.]"
docker compose build --no-cache

# コンテナを Down する
echo -e "\n[Stopping the Docker Compose.]"
docker compose down

# コンテナを起動する
echo -e "\n[Starting the Docker Compose.]"
docker compose up -d
