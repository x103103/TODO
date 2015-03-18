class Task < ActiveRecord::Base
  belongs_to :list

  def as_json(options = {})
    super(options)
  end
end