# React Template

## Component

* TypeScript
* Recoil
* SCSS

---

## React Rule

* JSXを複数行に渡って記述する際は括弧で括る
  * ASIに引っかからないため
* this.props と this.state を setState 内で同時に使用しない
  * この2つの値は非同期に更新されるため
  * setState((state, props) => {}) を使用する
* リスト項目には key を与える
  * key は取り囲まれる配列の要素に対して与える
  * e.g.) ul > ListItem > li のような構造の場合は ListItem に対して key を与える
* 関数型コンポーネントを利用する
  * Hooks を始めとしてこちらの方がメインストリームみたい
* コーディングをする際は UI → ロジック と実装を分けて行う
  * UI の実装段階では state は決して使わない
    * UI の実装は量が多いのに対して考えることは少ない
    * ロジックの実装は量が少ないのに対して考えることが多い
* children の型は `React.ReactNode` で定義するのがベスト
* Hooks はループや条件分岐やネストされた関数内で呼び出してはいけない
  * トップレベルで呼び出す
    * Recoil でも同様
  * `useState`, `useEffect` は記述した順番に処理がされる
    * スキップされたりすると呼び出しの順番が変わってしまう可能性がある
* Custom Hooks は `use` から名前を始めるようにする
  * コンポーネントからロジックを抽出して再利用可能な関数にした独自の Hooks のこと

## TypeScript Rule

* .tsx はコンポーネント、.ts はロジックを記述するように住み分けをする
  * JS と違って .tsx を付与しないと JSX を利用することができない
* オブジェクトの型注釈 (type) のプロパティの区切り文字には `;` を用いる
  * コード整形ツール Prettier が `, → ;` に置換するため

---

## React Memo

* JS ではクラスのメソッドはデフォルトではバインドされない
  * メソッドを直接渡すときは `this.method = this.method.bind(this);` でバインドする必要がある
  * アロー関数で代用できるが、レンダーの度に異なるコールバック関数が作成されるので、パフォーマンスに注意する
* JSX.Element vs React.FC vs React.VFC
  * JSX.Element を採用するのが吉
    * 型推論に頼っても良いが、明示する方針でいく
      * 明示するとパフォーマンスが改善されうる
      * TS を使ってるなら型宣言した方がメリットを享受できる
  * FC (FunctionComponent) vs VFC (VoidFunctionComponent)
    * props の型が PropsWithChildren なのが FC
    * コンポーネントで子要素を用いるとき、VFC では props の型に明示的に children を追加する必要がある

## TypeScript Memo

* readonly でプロパティを読み取り専用にできる
  * 再帰的ではないので孫のプロパティは書き換えられる
  * 孫も同様に読み取り専用にした場合は、孫プロパティにも `readonly` を付与する必要がある
* `typeof` の代わりに `instanceof` を用いることで `Object` 以上のチェックを行うことができる
  * `in` を用いることで特敵のプロパティを持つかも判定できる
* アロー関数でオブジェクトを返しつつ `return` を省略するときは `()` で括る
