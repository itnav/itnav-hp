# Itnav HP

URL: https://itnav.co.jp

<br />

## 🍀 必須環境

- [Node >= 21.x](https://nodejs.org/en/download/package-manager)
- [Bun >= 1x](https://bun.sh/docs/installation)

### 🥬 推奨環境

- [Docker >= 20.x](https://docs.docker.com/get-docker)
  - ※ デプロイが正常に行われることを確認するためだけに使用

<br />

## 🛠️ 使用技術

### Frontend

- [Astro](https://astro.build)
- [Svelte](https://svelte.dev)

### Backend

- [Astro](https://astro.build)

### Backend Runtime

- [Bun](https://bun.sh)

### CMS

- [MicroCMS](https://microcms.io)

<br />

## 🎱 開発

### 準備

#### 1. リポジトリをクローン

**HTTPS**

```bash
git clone https://github.com/itnav/itnav-hp.git
```

**SSH**

```bash
git clone git@github.com:itnav/itnav-hp.git
```

#### 2. クローン先へ移動

```bash
cd itnav-hp
```

#### 3. 依存関係モジュールをインストール

```bash
bun install
```

#### 4. 環境変数を設定

`.env.example` ファイルをコピーして `.env` ファイルを作成し、必要に応じて追加の環境変数を設定してください。

```bash
cp ./.env.example ./.env
```

**編集例**

```.env
WEB_CMS_DOMAIN=https://<xxx>.microcms.io/api/v1
WEB_CMS_API_KEY=<xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>
```

### 開発サーバーの起動

```bash
bun dev
```

### 本番環境を模倣した開発サーバーの起動

```bash
bun prod
```

<br />

## 🚀 デプロイ

デプロイは `main` ブランチにマージされると自動で行われます。

### 流れ

1. `main` ブランチに PR を作成
2. PR に対してレビュー & 承認（Approve）をもらいマージ
3. デプロイが正常に行われることを祈る（[こちら](https://github.com/itnav/itnav-hp/actions)で確認可能）

### 環境変数の変更

環境変数は `Github Secrets` にて管理しているため、ローカルの `.env` や `.env.local` ファイルに記述し Push したとしても反映されません。

環境変数を変更する場合は、[こちら](https://github.com/itnav/itnav-hp/settings/secrets/actions)から上書き変更してください。
