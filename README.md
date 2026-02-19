# 프론트엔드의 역사 | History of Frontend UI/UX

1995년부터 2025년까지, 30년간의 웹 UI/UX 디자인 변천사를 한 페이지에서 체험할 수 있는 인터랙티브 웹사이트입니다.

## 시대별 구성

| 연도 | 시대 | 주요 특징 |
|------|------|-----------|
| **1995** | 웹의 탄생 | 테이블 레이아웃, `<font>` 태그, 회색 배경, 방문자 카운터, Marquee |
| **2000** | 닷컴 버블 | Flash 인트로, 프레임, 네온 색상, 팝업 광고, Java Applet |
| **2005** | Web 2.0 | 글로시 버튼, 그라디언트, AJAX, RSS, 태그 클라우드, Beta 배지 |
| **2010** | 스큐어모피즘 | iOS 스타일, 텍스처, 토글 스위치, 반응형 시작, jQuery |
| **2015** | 플랫 디자인 | Material Design, 카드 UI, 햄버거 메뉴, FAB, 고스트 버튼 |
| **2020** | 모던 웹 | 다크 모드, 글래스모피즘, 뉴모피즘, CSS Grid, 그라디언트 부활 |
| **2025** | AI & 차세대 | AI 인터페이스, 벤토 그리드, 3D CSS, 스크롤 애니메이션, 대형 타이포 |

## 실행 방법

별도의 빌드 없이 정적 HTML/CSS/JS로 구성되어 있습니다.

```bash
# 로컬 서버로 실행 (Python)
python3 -m http.server 8080

# 또는 VS Code Live Server, 혹은 브라우저에서 index.html 직접 열기
```

## 기술 스택

- HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts (Press Start 2P, Comic Neue, Lobster, Roboto, Montserrat, Inter, Noto Sans KR)
- Intersection Observer API (스크롤 기반 애니메이션)
- CSS Grid, Flexbox, backdrop-filter, 3D transforms

## 프로젝트 구조

```
/
├── index.html          # 메인 페이지 (7개 시대 섹션 포함)
├── css/
│   ├── main.css        # 레이아웃, 타임라인, 랜딩 스타일
│   └── eras.css        # 시대별 고유 스타일
├── js/
│   └── main.js         # 네비게이션, 스크롤 애니메이션, 인터랙션
└── README.md
```
