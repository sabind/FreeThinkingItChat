class ChatRoom
  def initialize test_env
    @home = test_env[:url]
    @browser = test_env[:browser]
  end

  def go_home
    @browser.get @home
    validate_page
  end

  def validate_page
    wait = Selenium::WebDriver::Wait.new :timeout => 10
    wait.until {correct_page_title}
  end

  def correct_page_title
    @browser.title.downcase.include? "free thinking [it] chat"
  end
end