require 'rails_helper'

RSpec.describe "Home", :type => :request do
  it "get init time form api" do
    get "/api/v1/timestemps"

    expect(response.status).to be(200)
    json_data = JSON.parse(response.body)

    expect(json_data["message"]).to eq("ok")
    expect(json_data["data"]["epoch"]).to be_a(Fixnum)
  end
end
