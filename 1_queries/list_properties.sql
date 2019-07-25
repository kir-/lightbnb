SELECT properties.id, title, cost_per_night, AVG(rating) FROM properties
JOIN property_reviews ON properties.id = property_id
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY cost_per_night
LIMIT 10;