## 💕 [Present :: Couple Diary](https://couple-diary-app.herokuapp.com/)
## 💕 [Past :: Couple Diary](https://gangon0215.github.io/base-couple-emotion-diary/)


여자친구가 카카오톡으로 커플 다이어리 오픈채팅방을 만들어주었습니다.
하지만 카톡은 애초에 메신저이기 때문에 관리하기도 어렵고 찾기도 힘들었습니다.

---

## `2022-09-05` `300`

#### Title

오늘 여자친구와 같이 밥을 먹었고 영화 `마녀 2` 를 보았습니다.
<br/><br/>

이러한 형태로 프로그램을 만들고 싶었습니다. <br>
기본적으로 기능은 오늘 날짜를 카운팅 해주고 리스트 형식으로 다이어리를 뿌려주고 CRUD가 존재하며 <br>
아직은 서버를 쓰지않고 어느정도 뷰가 적당히 만들어 진다면 nodejs 를 이용하여 서버를 열어 db와 연동하여 사용할 예정입니다.

`인프런` [`한입 크기로 잘라먹는 리액트`](https://inf.run/LTMn) 강의를 보며 공부를 했으며
emotion diary 를 따라하며 커플 다이어리의 기반을 다지고 있습니다.

---

### TIL

- 2022/09/05

  - state, props 에 대해 배우고 state를 조금 더 효율적으로 사용하는 법을 배웠습니다.
  - useRef 를 통해 DOM 을 조작하는것에 대해 공부하였습니다.
  - react-router-dom 을 이용하여 page를 나눠서 작업 할려고 합니다. [`[React] react-router-dom v6 업그레이드 되면서 달라진 것들`](https://velog.io/@soryeongk/ReactRouterDomV6) 해당 블로그를 참고 하였습니다.

- 2022/09/06

  - js localStorage를 사용하여 데이터를 담아두었습니다
    > 이제 브라우저를 껏다 켜도 데이터가 남아 있어요!
  - 작성한 다이어리를 볼수있게 리스트 형식으로 만들어 두었습니다.
  - 이제 다이어리 작성을 하면 리스트로 출력되며 브라우저를 껏다 켜도 데이터가 남아 있어요

- 2022/09/13

  - 🌕좋은 추석 되세용🌕
  - About page를 추가했습니다.
  - 삭제 기능을 수정했습니다.
  - 잔잔한 버그들 수정 하였습니다.

- 2022/09/14

  - github에 의존성 에러 버전 경고가 떠서 해결을 하였습니다.

- 2022/09/15

  - editor 기능중 중복코드를 제거하여 함수로 만들었습니다.
  - detail을 추가하며 list 부분 영역에서 기존에 content, emotion 나오던 것을 detail 페이지에서 확인할수있게 만들었습니다.

- 2022/09/16

  - detail css 수정

- 2022/09/20
  - 전체적으로 button 디자인 수정, 반응형 수정
  - _server : express
  - _client : react
  - heroku 배포 완료
  - github 와 연동하여 git push 할때마다 heroku 에서 자동으로 배포를 해줍니다 (배포 자동화)
  
