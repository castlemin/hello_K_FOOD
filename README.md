# Hello K-Food
[프로젝트 관련 문서](https://bit.ly/440ebdy)


### 프로젝트 실행 관련 Docker 명령어

  #### 리엑트 서드파티모듈 로컬에 설치   
  `cd frontend && npm install && cd ..`

  #### docker-compose 실행
  `docker-compose up -d`
  * -d 옵션: 백그라운드 실행
  * MacOS m1칩 사용자들은 docker-compose.yml 파일에서 주석을 해제하고 실행해주세요

  #### backend서버에 접속하기(초기 데이터베이스 설정 목적)
  `docker exec -it no_chilsu_backend_1 /bin/bash`

  #### 초기 데이터베이스에 값 넣기
  `python manage.py makemigrations`  
  `python manage.py migrate`  
  `cd dataset_pipeline && python3 upload_csv.py && cd..`

  * 위 명령어가 오류나면 아직 DB의 실행이 덜 끝나서 그러니, 잠시 뒤 한번 더 입력해주시면 됩니다.
  * 위 명령어는 최초 1회만 실행해주시고, 이후에는 자동으로 db_mysql/data 폴더 내 자료가 저장됩니다.

  #### 웹페이지 접속해서 확인하기(3000번 포트)
  * localhost:3000 에 접속해서 서비스 실행되는지 확인
  * "칠 수 없다 으라챠챠!!" 가 보인다면 잘 되고 있는 겁니다.

  #### 서버 종료 하기
  `docker-compose down`

  #### 서버 삭제 하기
  `docker rmi no_chilsu_db no_chilsu_frontend no_chilsu_backend`
  * 서버를 종료해야 삭제가 가능합니다.

