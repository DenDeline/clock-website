import type { Dictionary } from '@/i18n'

const ja = {
  locale: {
    code: 'ja',
    htmlLang: 'ja',
    openGraph: 'ja_JP',
  },
  site: {
    name: 'Life Clock',
    description:
      '人生の時間を24時間時計として可視化する、振り返りのためのライフクロックです。',
    author: 'DenDeline',
    authorUrl: 'https://dendeline.com',
    category: 'lifestyle',
    ogImageAlt: '人生の時間を24時間時計として可視化するLife Clock',
  },
  routes: {
    home: {
      title: 'Life Clock | 人生を24時間時計として可視化',
      description:
        '人生の期間を24時間表示に置き換え、時間、進み具合、視点をひと目で捉えられる振り返りのためのライフクロックです。',
      ariaLabel: 'インタラクティブなライフクロック',
      intro: {
        title: 'Life Clock',
        body: 'Life Clockは、人生を24時間時計として可視化する振り返りのためのツールです。開始日と想定する終点を入力すると、現在の瞬間がシンプルな1日のリズムの中でどこに位置するかを確認できます。',
      },
      sections: [
        {
          title: '表示されること',
          body: '選択した開始日から終了日までの時間を、1日の時計に対応させて表示します。予測ではなく視点を得るためのもので、時間の流れを静かに意識するための視覚的な手がかりとして使えます。',
        },
        {
          title: '使い方',
          body: '生年月日、または意味のある開始日を選び、終了年齢または正確な終了日を入力します。アプリがその期間における進み具合を計算し、24時間時計の現在時刻として表示します。',
        },
      ],
      privacy: {
        title: 'プライバシー',
        beforeLink:
          '入力した日付はブラウザ内に保存されます。Life Clockは設定をお使いの端末にローカル保存し、同じ設定で時計を再表示できるようにします。これらの日付をサーバーへ送信することはありません。詳しくは',
        link: 'プライバシーポリシー',
      },
    },
    privacy: {
      title: 'プライバシーポリシー | Life Clock',
      description:
        'Life Clockが時計の設定をブラウザ内にローカル保存し、サイトの利用状況とパフォーマンスを把握するためにGoogle Analyticsを使用する方法について説明します。',
      heading: 'プライバシーポリシー',
      effectiveDateLabel: '施行日',
      effectiveDate: '2026年5月29日',
      dateModified: '2026-05-29',
      sections: [
        {
          title: 'Life Clockの運営者',
          body: [
            'Life ClockはDenDelineが運営しています。プライバシーに関する質問や依頼は、',
            {
              type: 'link',
              href: 'mailto:contact@dendeline.com',
              text: 'contact@dendeline.com',
            },
            ' までご連絡ください。',
          ],
        },
        {
          title: 'お使いの端末に保存される情報',
          body: 'Life Clockは、時計の設定をブラウザのローカルストレージに保存します。これには開始日、終了日、終了日を直接入力したか終了年齢から計算したかが含まれます。この情報はお使いの端末に残り、同じ設定で時計を再表示するために使用されます。',
        },
        {
          title: 'Life Clockへ送信されない情報',
          body: 'Life Clockは、開始日、終了日、終了年齢をアプリケーションサーバーへ送信しません。時計の計算はブラウザ内で実行されます。これらの設定はローカルに保存されるため、Life Clockのサイトデータを削除すると設定も削除されます。',
        },
        {
          title: '分析とパフォーマンスデータ',
          body: '本番環境では、Life Clockはサイト利用状況とパフォーマンスを集計して把握するためにGoogle Analyticsを使用します。Google Analyticsは、ページURL、IPアドレス、ブラウザや端末の情報、Cookieまたは類似の識別子、読み込みや操作に関する指標などのweb-vitalsイベントデータを受け取る場合があります。Life Clockが時計の日付をGoogle Analyticsへ送信することはありません。',
        },
        {
          title: '情報の利用目的',
          body: 'ローカルの時計設定は、時計を動作させ、お使いの端末で設定を記憶するために使用されます。分析データとパフォーマンスデータは、訪問者によるサイト利用の把握、技術的な問題の特定、体験の改善に使用されます。',
        },
        {
          title: '共有',
          body: [
            'Life Clockは個人情報を販売しません。分析データとパフォーマンスデータは、Google AnalyticsによってGoogleの規約およびプライバシー慣行に従って処理されます。Googleがサービスを使用するサイトからのデータをどのように利用するかについては、',
            {
              type: 'link',
              href: 'https://policies.google.com/technologies/partner-sites',
              text: 'policies.google.com/technologies/partner-sites',
            },
            ' をご覧ください。',
          ],
        },
        {
          title: '保持期間',
          body: 'ローカルの時計設定は、ローカルストレージ、サイトデータ、またはブラウザプロファイルを削除するまでブラウザ内に残ります。Google Analyticsの保持期間は、Google Analyticsの設定およびGoogle自身の保持慣行によって管理されます。',
        },
        {
          title: '選択肢',
          body: [
            'Life Clockのローカル設定は、このWebサイトのサイトデータをブラウザで削除することで消去できます。また、Cookieや類似の識別子はブラウザ設定でブロックまたは削除できます。ブラウザでGoogle Analyticsを使用したくない場合は、Google Analyticsオプトアウトブラウザアドオンをインストールできます。プライバシーに関する質問や依頼は、',
            {
              type: 'link',
              href: 'mailto:contact@dendeline.com',
              text: 'contact@dendeline.com',
            },
            ' までご連絡いただくこともできます。',
          ],
        },
        {
          title: '子ども',
          body: 'Life Clockは子どもを対象としておらず、子どもの個人情報を故意に収集することはありません。',
        },
        {
          title: '更新',
          body: 'Life Clockのプライバシー慣行が変更された場合、このポリシーは更新されることがあります。上記の施行日は、このポリシーが最後に更新された日を示しています。',
        },
      ],
      backLink: 'Life Clockへ戻る',
    },
  },
  app: {
    dateFormat: 'YYYY/MM/DD',
    colorMode: {
      label: 'カラーモード',
      system: 'システム',
      light: 'ライト',
      dark: 'ダーク',
    },
    controls: {
      settings: '設定',
      sourceCode: 'ソースコード',
      hideInterface: 'インターフェースを非表示',
      showInterface: 'インターフェースを表示',
      toggleInterface: 'インターフェース表示を切り替え',
    },
    dialog: {
      settingsTitle: '設定',
      welcomeTitle: 'ようこそ',
      intro: '人生の歩みを、独自の24時間の視点で可視化します。',
      close: '閉じる',
      save: '保存',
    },
    form: {
      startDate: '開始日',
      endDateQuestion: '終了日はどのように計算しますか？',
      age: '年齢',
      date: '日付',
      endAge: '終了年齢',
      endDate: '終了日',
      info: '誕生日を使用して、人生の時計がどれくらい進んでいるかを計算します。平均寿命は、24時間サイクル全体を推定するために役立ちます。この情報はお使いの端末にのみ保存され、共有されません。',
    },
    validation: {
      startDateRequired: '開始日を入力してください',
      endDateRequired: '終了日を入力してください',
      invalidDate: '日付が正しくありません',
      endAgePositive: '終了年齢は0より大きい値にしてください',
    },
  },
} as const satisfies Dictionary

export default ja
