require 'selenium-webdriver'
require 'capybara'
require 'rspec'
require 'launchy'
require 'headless'

case ENV['BROWSER']
  when 'ff', 'Firefox'
    browser = Selenium::WebDriver.for :firefox
    browser_name = 'Firefox'
  when 'chrome'
    browser = Selenium::WebDriver.for :chrome
    browser_name = 'Chrome'
  when 'debug'
    debug_profile = Selenium::WebDriver::Firefox::Profile.new
    debug_profile.add_extension "firebug-1.9.1-fx.xpi"
    browser = Selenium::WebDriver.for :firefox, :profile => debug_profile
    browser_name = 'Firefox (Firebug)'
  when 'mobile'
    mobile_profile = Selenium::WebDriver::Firefox::Profile.new
    mobile_profile['general.useragent.override'] = "Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en)
      AppleWebKit/420+ (KHTML, like Gecko) Version/3.0
      Mobile/1A535b Safari/419.3"
    browser = Selenium::WebDriver.for :firefox, :profile => mobile_profile
    browser_name = 'Mobile'
  when 'headless'
    headless_profile = Headless.new
    headless.start
    browser = Selenium::WebDriver.for :firefox, :profile => headless_profile
    browser_name = 'Firefox'
  else
    browser = Selenium::WebDriver.for :firefox
    browser_name = 'Firefox'
end

url = "http://localhost:3000"
environment = "dev"
client = "test@email.com/password"

puts "Browser      " + browser_name
puts "URL          " + url
puts "Environment: " + environment
puts "Client:      " + client

test_env = {   :browser => browser,
               :browser_name => browser_name,
               :url => url,
               :env => environment,
               :client => client,
               :login => nil }

Before do
  @test_env = test_env
  @browser = browser
end

Capybara.use_default_driver

After do |scenario|
  take_screenshot(@browser, scenario)
end

def take_screenshot(browser, scenario)
  if scenario.failed?
    scenario_name = scenario.name.gsub /[^\w\-]/, ' '
    time = Time.now.strftime("%Y-%m-%d %H%M")
    screenshot_path = './failed_png/' + time + ' - ' + scenario_name + '.png'
  else
    scenario_name = scenario.name.gsub /[^\w\-]/, ' '
    time = Time.now.strftime("%Y-%m-%d %H%M")
    screenshot_path = './success_png/' + time + ' - ' + scenario_name + '.png'
  end
  browser.save_screenshot(screenshot_path)
end

at_exit do
  if ENV['KEEP_OPEN'] != 'false' || ENV['KEEP_OPEN'] != 'no'
    browser.close
  end
end