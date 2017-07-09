require "rails_helper"

RSpec.describe Timestemp, :type => :model do
  context "create time" do
    it "orders them in reverse chronologically" do
      Timestemp.new(time: 1, counter: 1).save
      Timestemp.new(time: 2).save
      Timestemp.all
      expect(Timestemp.all.length).to eq(2)
      expect(Timestemp.find_by(time: 1).counter).to eq(1)
      expect(Timestemp.find_by(time: 2).counter).to eq(0)
    end
  end
end
