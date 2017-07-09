class Api::V1::TimestempsController < ApplicationController
  def create
    __permited = create_params
    isExist = Timestemp.find_by(time: __permited["time"])
    if isExist.present?
      isExist.increase_count(1)
    else
      saved = Timestemp.new(time: __permited["time"], counter: 1).save
    end

    render status: 200, json: {message: 'ok'}
  end

  def index
    render status: 200, json: {message: 'ok', data: {epoch: Time.zone.now.to_i} }
  end

  private
    def create_params
      params.require(:form).permit(:time)
    end
end

#
# Prefix Verb   URI Pattern                           Controller#Action
# api_v1_timestemps GET    /api/v1/timestemps(.:format)          api/v1/timestemps#index
#        POST   /api/v1/timestemps(.:format)          api/v1/timestemps#create
# new_api_v1_timestemp GET    /api/v1/timestemps/new(.:format)      api/v1/timestemps#new
# edit_api_v1_timestemp GET    /api/v1/timestemps/:id/edit(.:format) api/v1/timestemps#edit
# api_v1_timestemp GET    /api/v1/timestemps/:id(.:format)      api/v1/timestemps#show
#        PATCH  /api/v1/timestemps/:id(.:format)      api/v1/timestemps#update
#        PUT    /api/v1/timestemps/:id(.:format)      api/v1/timestemps#update
#        DELETE /api/v1/timestemps/:id(.:format)      api/v1/timestemps#destroy
#   root GET    /                                     hello_world#index
