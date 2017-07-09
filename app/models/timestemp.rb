class Timestemp < ApplicationRecord
  def increase_count(v)
    increment!(:counter, v)
  end
end
