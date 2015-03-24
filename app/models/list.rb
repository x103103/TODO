class List < ActiveRecord::Base
  has_many :tasks, -> { order 'position desc' }, dependent: :destroy
  belongs_to :user

  def as_json(options = {})
    super(options.merge(include: [:user, :tasks]))
  end
end
