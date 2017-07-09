## Install dependency 
  >bundle && yarn
  
## Important 
I have used [react_on_rails](https://github.com/shakacode/react_on_rails) in this project, Therefore you need to install NodeJs and yarn in you machine first, If you familiar with npm in this project no need to use npm. For install yarn checkout instuction here https://yarnpkg.com/lang/en/docs/install/

## How to run application
  To run application use following commemd
   >foreman start -f Procfile.dev
   
  then go to http://localhost:3000/
  
  Also you can run 
  >rails s
  
  Note: after use foreman but any change in project will not apply immediately. So if you want to apply any change on development use foreman instaed is build in hot load for react
  
  ## How to run unit test
  This project use [rspec-rails](https://github.com/rspec/rspec-rails) and Document here https://relishapp.com/rspec/rspec-rails/docs
  
  To run test 
  >rake spec 

Video result 
https://youtu.be/2dzrBf_stww
