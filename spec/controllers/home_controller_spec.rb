require "rails_helper"

RSpec.describe HelloWorldController, :type => :controller do
  describe "Get home page render form server" do
    it "responds to text/html from controller" do
      get :index
      expect(response.content_type).to eq("application/json")
    end
  end
end
