# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Campaign.delete_all
User.create({email: "demo_user@demo.com", password: "password", first_name: "Demo User", last_name: "User"})
Campaign.create({location: "United States", creator_type: "Individual", banking_location: "United States", creator_id: User.all[0].id})
  
  # , duration: "30", creator_id: User.all[0].id})
# 10.times do
#   User.create(email: Faker::Internet.unique.free_email, password: "password")
# end  