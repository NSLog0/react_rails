require 'rails_helper'

RSpec.describe "User convet unix to local time", :type => :request do
  it "send first unix time to api" do
    post "/api/v1/timestemps", params: { form: {time: 1499612958} }
    expect(response.status).to be(200)
    expect(Timestemp.all.last.time).to eq("1499612958")
    expect(Timestemp.all.last.counter).to eq(1)

  end

  it "send twice unix time to api" do
    post "/api/v1/timestemps", params: { form: {time: 1499612958} }
    post "/api/v1/timestemps", params: { form: {time: 1499612958} }
    # puts response
    expect(response.status).to be(200)
    expect(Timestemp.all.last.time).to eq("1499612958")
    expect(Timestemp.all.last.counter).to eq(2)
  end
end
