class List < ActiveRecord::Base
  has_many :tasks
  belongs_to :user

  def as_json(options = {})
    super(options.merge(include: [:user, :tasks]))
  end
end
