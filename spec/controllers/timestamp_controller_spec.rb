require "rails_helper"

RSpec.describe Api::V1::TimestempsController, :type => :controller do
  describe "responds to" do
    it "responds to application/json from api controller" do
      get :index
      expect(response.content_type).to eq("application/json")
      json_data = JSON.parse(response.body)

      expect(json_data["message"]).to eq("ok")
      expect(json_data["data"]["epoch"]).to be_a(Fixnum)
    end

    it "create date via create function of controller" do
      post :create, params: { form: {time: 1499612958} }
      expect(response.content_type).to eq("application/json")
      expect(response.status).to be(200)
      expect(Timestemp.all.last.time).to eq("1499612958")
      expect(Timestemp.all.last.counter).to eq(1)
    end
  end
end
