require File.join(File.dirname(__FILE__), '..', 'lib', 'ChatRoom')

Given /^I go to the 'homepage'$/ do
  @page = ChatRoom.new @test_env
  @page.go_home
end

Then(/^I should see the 'homepage'$/) do
  @page.validate_page
end