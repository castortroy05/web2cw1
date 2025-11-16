var express = require('express');
var router = express.Router();
const { body, param, validationResult } = require('express-validator');

// NC500 API version 2.0

var hostels =[
    {
        "id": "1",
        "name": "Torridon Youth Hostel",
        "address": "Torridon, by Achnasheen, Ross-shire",
        "postcode": "IV22 2EZ",
        "phone": "+44 (0) 1445 791284",
        "email": "torridon@hostellingscotland.org.uk",
        "description": "Winner of the Silver Award in the The Great Outdoors Magazine Awards 2020 for accommodation, Torridon Youth Hostel sits on the NC500 at the head of Upper Loch Torridon and is a popular base for hillwalkers, climbers and those simply wishing to relax and enjoy the surroundings and local wildlife.",
        "location": {"lat":57.543799,"long":-5.504566},
        "ratings": [5,4],
        "reviews" : [
            {"reviewer":"anon1", "review": "Great location"},
            {"reviewer":"anon2", "review": "Very comfortable accommodation"},
        ]
    },
    {
        "id": "2",
        "name": "Inverness Youth Hostel",
        "address": "Victoria Drive, Inverness",
        "postcode": "IV2 3QB",
        "phone": "+44 (0) 1463 231 771",
        "email": "inverness@hostellingscotland.org.uk",
        "description": "Located in a quiet neighbourhood a short walk from the city centre, Inverness Youth Hostel offers guests four star VisitScotland accredited hostel accommodation. A popular choice for individual travellers, backpackers, families and groups, the hostel has a range of private and en-suite rooms as well as spacious shared accommodation with individual lockers for those exploring the 'Capital of the Highlands' on a budget. Some of the rooms enjoy glorious views towards the Moray Firth.",
        "location": {"lat":57.480662,"long":-4.211335},
        "ratings": [2,3,3,4,5,2,3,3,2,4,4,5,4,3,5,4,2],
        "reviews" : [
            {"reviewer":"anon", "review": "Very handy for the city centre"},
        ]
    },
    {
        "id": "3",
        "name": "Gairloch Sands Youth Hostel",
        "address": "Carn Dearg, Gairloch, Ross-shire",
        "postcode": "IV21 2DJ",
        "phone": "+44 (0) 1445 712 219",
        "email": "gairloch@hostellingscotland.org.uk",
        "description": "A lochside lodge, sitting on the northern shore of Loch Gairloch, with magnificent sea and mountain views and easy access to fantastic sandy beaches. Gairloch Sands Youth Hostel is a great base for exploring the North West Highlands, offering guests a range of comfortable private and shared rooms. None of the rooms are en-suite but ample shower and washroom facilities are available.",
        "location": {"lat":57.732262,"long":-5.759794},
        "ratings": [3,5,4,4,2,4,4,4,5,5,1,2,4,3],
        "reviews" : [
            {"reviewer":"anon1", "review": "Lovely views"},
            {"reviewer":"anon2", "review": "Dog-friendly hostel"},
            {"reviewer":"anon3", "review": "Enjoyed the wee breakfast"}
        ]
    },
    {
        "id": "4",
        "name": "Tongue Hostel",
        "address": "Tongue, By Lairg, Sutherland",
        "postcode": "IV27 4XH",
        "phone": "+44 (0) 1847 611789",
        "email": "kothostelandhp@btinternet.com",
        "description": "Tongue Hostel is a magnificently situated stone lodge on the shores of the Kyle of Tongue. Once a former hunting and fishing lodge dating back to 1891, the hostel offers wonderful views of Ben Loyal, Ben Hope and Rabbit Island. A short walk from Tongue village, it's a perfect place for hill walking, cycling, fishing, photography, nature and bird watching with plenty of beaches to explore.",
        "location": {"lat":58.492768,"long":-4.428430},
        "ratings": [4,4,4,3,3,3,5,5,2,1,1,4,5,4,3,3,3,3,3,3],
        "reviews" : [
            {"reviewer":"anon", "review": "Muy buen alojamiento, excelente ubicación"}
        ]
    },
    {
        "id": "5",
        "name": "Ullapool Youth Hostel",
        "address": "Shore Street, Ullapool",
        "postcode": " IV26 2U",
        "phone": "+44 (0) 1854 612 254",
        "email": "ullapool@hostellingscotland.org.uk",
        "description": "From its spectacular seafront location on the NC500, Ullapool Youth Hostel offers wonderful, ever-changing views over Loch Broom and the Beinn Dearg mountain range. Perfect for groups, families and individual travellers, this warm and welcoming hostel offers guests a variety of room types, all of which can be booked as private rooms and there are ample shower and washroom facilities.",
        "location": {"lat":57.896333,"long":-5.156314},
        "ratings": [4,5,5,5,3,2,4,5,4,4,4,3,3,5,4,4,3,1],
        "reviews" : []
    },
    {
        "id": "6",
        "name": "Durness Smoo Youth Hostel",
        "address": "Smoo, Lairg",
        "postcode": " IV27 4QA",
        "phone": "+44 (0) 1971-511-264",
        "email": "durness@hostellingscotland.org.uk",
        "description": "Sitting on the famous NC500, surrounded by a wild and spectacular landscape, Durness Smoo offers a true hostelling experience in simple, relaxed and welcoming accommodation. A refuge from the hustle and bustle of everyday life, the hostel is an ideal base for exploring the local area, and offers guests a range of comfortable private and shared rooms. None of the rooms are en-suite but ample shower and washroom facilities are available.",
        "location": {"lat":58.563542,"long":-4.723322},
        "ratings": [4,2,4,5,2,3,3,3,5,2,2,4,5,4,3,4,4,4,2],
        "reviews" : [
            {"reviewer":"anon1", "review": "This hostel is the best thing ever in the entire world"},
            {"reviewer":"anon2", "review": "Fasgadh bho othail is beatha làitheil"},
        ]
    },
    {
        "id": "7",
        "name": "Helmsdale Hostel",
        "address": "Helmsdale, Sutherland",
        "postcode": "KW8 6JR",
        "phone": "+44 (0) 7971 922 356",
        "email": "stay@helmsdalehostel.co.uk",
        "description": "Helmsdale Hostel is an International Tourist Accommodation, located in the village of Helmsdale, Sutherland. It is in a prominent position directly on the A9 at the north end of the village. The building was refurbished in the summer of 2018, with eco-friendly measures, including a sustainable heating system, drying and laundry facilities.",
        "location": {"lat":58.117588,"long":-3.648901},
        "ratings": [5,2,2,2,2,3,1,1,1,3,4,2,5,1,2,2,2],
        "reviews" : [
            {"reviewer":"anon1", "review": "Nice garden, suitable for outside eating"},
            {"reviewer":"anon2", "review": "Braw!"}
        ]
    },
    {
        "id": "8",
        "name": "Applecross, Hartfield House",
        "address": "Hartfield House, Applecross",
        "postcode": "IV54 8ND",
        "phone": "+44 (0) 1520 744 333",
        "email": "infohartfield@gmail.com",
        "description": "Hartfield House is a Visit Scotland 4 Star hostel, set back from main North Coast 500 road, nestled amongst the mountainous landscape, shady trees, and bubbling river. The Applecross peninsula boasts a breathtakingly beautiful and dramatic landscape. The main township of Applecross ('a Chomraich' in Gaelic, which means 'sanctuary') is located around the picturesque bay and enjoys uninterrupted views over the island of Raasay and the Cuillin Hills of Skye.",
        "location": {"lat":57.452662,"long":-5.802272},
        "ratings": [5,5,5,3,3,3,5,5,5,3,3,3,5,5,3,3,3,3,5],
        "reviews" : [
            {"reviewer":"anon1", "review": "Keskellä ei mitään"},
            {"reviewer":"anon2", "review": "아무데도 없는 가운데"},
            {"reviewer":"anon3", "review": "Katikati ya mahali"}
        ]
    },
    {
        "id": "9",
        "name": "Achmelvich Beach Youth Hostel",
        "address": "Recharn, Lairg, Sutherland",
        "postcode": "IV27 4JB",
        "phone": "+44 (0) 1571 844 480",
        "email": "achmelvich@hostellingscotland.org.uk",
        "description": "Winning silver in the The Great Outdoors Magazine awards for accommodation - Achmelvich Beach Youth Hostel sits on the NC500, beside a beautiful, sheltered white sandy beach, close to the iconic mountain of Suilven. This small and friendly hostel provides a relaxing base to explore miles of unspoilt coastline and discover quiet secluded beaches, crystal clear waters and abundant wildlife.",
        "location": {"lat":58.168936,"long":-5.304672},
        "ratings": [2,2,2,4,2,4,2,4,2,4,4,4,4,4,4,4,2,4],
        "reviews" : [
            {"reviewer":"anon", "review": "Quite good"},
        ]
    },
    {
        "id": "10",
        "name": "Portsoy",
        "address": "Back Green, Portsoy, Aberdeenshire",
        "postcode": "AB45 2AF",
        "phone": "+44 (0) 1261 842222",
        "email": "contact@portsoysailloft.org",
        "description": "The Sail Loft in Portsoy offers self-catering bunkhouse accommodation with 25 luxurious beds and bunks, all with premium quality mattresses, reading lights, power sockets and secure lockers. Beds are designed to be both singles or doubles, so can easily be adjusted to meet your needs. Cots are available for visiting families.",
        "location": {"lat":57.682264,"long":-2.683269},
        "ratings": [],
        "reviews" : [
            {"reviewer":"anon1", "review": "Very up to date and covers a lot of ground"},
            {"reviewer":"anon2", "review": "Comprehensive, but could be more clearly written"},
        ]
    },
    {
        "id": "11",
        "name": "Drumnadrochit",
        "address": "Loch Ness Backpackers, Coiltie Farmhouse",
        "postcode": "IV63 6UN",
        "phone": "+44 (0) 1456 450807",
        "email": "info@lochness-backpackers.com",
        "description": "Situated in the village of Lewiston within Drumnadrochit, a short distance from Loch Ness and Urquhart Castle, this is a perfect location for activity or relaxation and great for families, groups and individuals. It's an ideal location for the Great Glen Way. Loch Ness Backpackers is your Highland home away from home. The team provide a warm welcome in all weathers, with free tea and coffee, a wood stove, a large guest kitchen and a residents-only bar with over 100 Scottish beers and whiskies.",
        "location": {"lat":57.329341,"long":-4.471393},
        "ratings": [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        "reviews" : [
            {"reviewer":"anon1", "review": "Disappointed not to see Nessie"},
            {"reviewer":"anon2", "review": "Great location, great views"},
            {"reviewer":"anon3", "review": "Quite handy for Inverness"}
        ]
    },
    {
        "id": "12",
        "name": "Glen Affric Youth Hostel",
        "address": "Allt Beithe, Glen Affric, Cannich, Beauly",
        "postcode": "IV4 7ND",
        "phone": "0345 293 7373",
        "email": "",
        "description": "A former stalking bothy on the Affric Estate, this friendly eco-hostel offers a warm welcome and an unforgettable experience in one of the most beautiful glens in Scotland. A wind turbine and solar panels provide warm water and electricity, while the comfortable common room and kitchen are heated by wood and coal fires.",
        "location": {"lat":57.23236,"long":-5.1831},
        "ratings": [4,3,3,4,2,3,5,4,3,2,1,2,3,4,5,3,3,3],
        "reviews" : [
            {"reviewer":"anon1", "review": "بالتأكيد في وسط اللا مكان"},
            {"reviewer":"anon2", "review": "Absolutamente no meio do nada"},
            {"reviewer":"anon3", "review": "Απολύτως στη μέση του πουθενά"}
        ]
    },
    {
        "id": "13",
        "name": "Ratagan Youth Hostel",
        "address": "Glenshiel, Kyle, Ross-shire",
        "postcode": "IV40 8HP",
        "phone": "+44 (0) 1599 511 243",
        "email": "ratagan@hostellingscotland.org.uk",
        "description": "Small and intimate, Ratagan Youth Hostel is has a stunning lochside location with enviable views towards Skye. Perfect for groups, families and individual travellers, this warm and welcoming hostel offers guests a variety of room types, all with USB charging points, and all able to be booked as private rooms. The accommodation is split over two floors and none of the rooms are en-suite, but ample shower and washroom facilities are available.",
        "location": {"lat":57.222139,"long":-5.447147},
        "ratings": [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5],
        "reviews" : [
            {"reviewer":"anon", "review": "Rooms have USB charging points"},
        ]
    },
    {
        "id": "14",
        "name": "Portree Youth Hostel",
        "address": "Portree, Isle of Skye",
        "postcode": "IV51 9EW",
        "phone": "+44 (0) 1478 612 231",
        "email": "portree@hostellingscotland.org.uk",
        "description": "Located in the heart of Portree, capital of the Isle of Skye, and one of Scotland's most popular destinations, Portree Youth Hostel offers a range of room types, from small private en-suites to shared accommodation, some with views over the Sound of Rassay. All rooms have USB charging points and most have individual bed lights.",
        "location": {"lat":57.4122671,"long":-6.1960968},
        "ratings": [4,4,4,4,4,4,4,4,4,4,4,4,4,1,5],
        "reviews" : [
            {"reviewer":"anon1", "review": "Not really on the NC500, but nice anyway"},
            {"reviewer":"anon2", "review": "This is a great hostel! "}
        ]
    },
    {
        "id": "15",
        "name": "Fort Augustus",
        "address": "Morag's Lodge, Bunoich Brae, Fort Augustus",
        "postcode": "PH32 4DG",
        "phone": "+44 (0) 1320 366289",
        "email": "info@moragslodge.com",
        "description": "A multi-award winning hostel that delivers \"Highland Hospitality\" at its best. Located in the charming village of Fort Augustus, Morag's Lodge is an ideal base for exploring Loch Ness and the Great Glen. It's perfect for families and groups with great facilities including twin, double and ensuite rooms, a lively bar with open fire and regular live music.",
        "location": {"lat":57.148251,"long":-4.682000},
        "ratings": [4,3,2,4,4,4,3,5,4,2,3,5,5,4,3,3,4,5,5,5,3],
        "reviews" : [
            {"reviewer":"anon1", "review": "Great live music and atmosphere"},
            {"reviewer":"anon2", "review": "Great value breakfasts, home-cooked evening meals and packed lunches"},
            {"reviewer":"anon3", "review": "Some kind of big loch thing nearby"},
            {"reviewer":"anon4", "review": "Got great photos of the monster, it totally exists"}
        ]
    }
]

var itineraries = [
    {
        "user": "Alice",
        "startdate" : new Date(2022, 5, 24),
        "stages": [
            {"stage":1, "hostel":1, "nights": 2},
            {"stage":2, "hostel":2, "nights": 2},
            {"stage":3, "hostel":3, "nights": 2},
            {"stage":4, "hostel":4, "nights": 2},
        ]
    }
]

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NC500 API v2.0' });
});

// ===== HOSTEL ENDPOINTS =====

/* GET all details of all hostels */
router.get('/hostels', function(req, res) {
    if (hostels.length === 0) {
        return res.status(404).json({ error: 'No hostels found' });
    }
    res.status(200).json(hostels);
})

/* GET hostel by id */
router.get('/hostels/:id',
    param('id').isNumeric().withMessage('Hostel ID must be a number'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const selectedHostels = hostels.filter(hostel => hostel.id == req.params.id);

        if (selectedHostels.length === 0) {
            return res.status(404).json({ error: 'Hostel not found' });
        }

        res.status(200).json(selectedHostels[0]);
    }
)

/* GET hostels by search term in description or address */
router.get('/hostels/search/:term',
    param('term').trim().isLength({ min: 2 }).withMessage('Search term must be at least 2 characters'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const searchTerm = req.params.term.toLowerCase();
        const selectedHostels = hostels.filter(hostel => {
            return hostel.address.toLowerCase().includes(searchTerm) ||
                   hostel.description.toLowerCase().includes(searchTerm) ||
                   hostel.name.toLowerCase().includes(searchTerm);
        });

        if (selectedHostels.length === 0) {
            return res.status(404).json({ error: 'No hostels found matching search term' });
        }

        res.status(200).json(selectedHostels);
    }
)

/* POST add rating for hostel by id */
router.post('/hostels/:id/rating',
    param('id').isNumeric().withMessage('Hostel ID must be a number'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const hostel = hostels.find(h => h.id == req.params.id);

        if (!hostel) {
            return res.status(404).json({ error: 'Hostel not found' });
        }

        hostel.ratings.push(Number(req.body.rating));
        res.status(201).json({
            message: 'Rating added successfully',
            hostel: hostel
        });
    }
)

/* POST new review for hostel by id */
router.post('/hostels/:id/review',
    param('id').isNumeric().withMessage('Hostel ID must be a number'),
    body('reviewer').trim().isLength({ min: 1, max: 50 }).withMessage('Reviewer name must be between 1 and 50 characters'),
    body('review').trim().isLength({ min: 5, max: 500 }).withMessage('Review must be between 5 and 500 characters'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const hostel = hostels.find(h => h.id == req.params.id);

        if (!hostel) {
            return res.status(404).json({ error: 'Hostel not found' });
        }

        const newReview = {
            reviewer: escapeHtml(req.body.reviewer),
            review: escapeHtml(req.body.review)
        };

        hostel.reviews.push(newReview);
        res.status(201).json({
            message: 'Review added successfully',
            hostel: hostel
        });
    }
)

// ===== ITINERARY ENDPOINTS =====

/* GET all itineraries */
router.get('/itineraries', function(req, res) {
    if (itineraries.length === 0) {
        return res.status(404).json({ error: 'No itineraries found' });
    }
    res.status(200).json(itineraries);
})

/* GET itinerary for user */
router.get('/itineraries/:user',
    param('user').trim().isLength({ min: 1 }).withMessage('User name is required'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const selectedItinerary = itineraries.filter(it => it.user === req.params.user);

        if (selectedItinerary.length === 0) {
            return res.status(404).json({ error: 'No itinerary found for this user' });
        }

        res.status(200).json(selectedItinerary[0]);
    }
)

/* POST create new itinerary for user */
router.post('/itineraries',
    body('user').trim().isLength({ min: 1, max: 50 }).withMessage('User name must be between 1 and 50 characters'),
    body('startdate').optional().isISO8601().withMessage('Start date must be a valid date'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = escapeHtml(req.body.user);

        // Check if user already has an itinerary
        const existing = itineraries.find(it => it.user === user);
        if (existing) {
            return res.status(409).json({ error: 'User already has an itinerary' });
        }

        const startdate = req.body.startdate ? new Date(req.body.startdate) : new Date();
        const newItinerary = {
            user: user,
            startdate: startdate,
            stages: []
        };

        itineraries.push(newItinerary);
        res.status(201).json({
            message: 'Itinerary created successfully',
            itinerary: newItinerary
        });
    }
)

/* PUT update start date */
router.put('/itineraries/:user/startdate',
    param('user').trim().isLength({ min: 1 }).withMessage('User name is required'),
    body('startdate').isISO8601().withMessage('Start date must be a valid date'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const itinerary = itineraries.find(it => it.user === req.params.user);

        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        itinerary.startdate = new Date(req.body.startdate);
        res.status(200).json({
            message: 'Start date updated successfully',
            itinerary: itinerary
        });
    }
)

/* POST new itinerary stage */
router.post('/itineraries/:user/stages',
    param('user').trim().isLength({ min: 1 }).withMessage('User name is required'),
    body('hostel').isInt({ min: 1, max: 15 }).withMessage('Hostel ID must be between 1 and 15'),
    body('nights').isInt({ min: 1, max: 30 }).withMessage('Nights must be between 1 and 30'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const itinerary = itineraries.find(it => it.user === req.params.user);

        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        // Verify hostel exists
        const hostelExists = hostels.find(h => h.id == req.body.hostel);
        if (!hostelExists) {
            return res.status(400).json({ error: 'Invalid hostel ID' });
        }

        const nextStageNumber = itinerary.stages.length + 1;
        const newStage = {
            stage: nextStageNumber,
            hostel: Number(req.body.hostel),
            nights: Number(req.body.nights)
        };

        itinerary.stages.push(newStage);
        res.status(201).json({
            message: 'Stage added successfully',
            itinerary: itinerary
        });
    }
)

/* PUT update itinerary stage */
router.put('/itineraries/:user/stages/:stage',
    param('user').trim().isLength({ min: 1 }).withMessage('User name is required'),
    param('stage').isInt({ min: 1 }).withMessage('Stage number must be a positive integer'),
    body('hostel').isInt({ min: 1, max: 15 }).withMessage('Hostel ID must be between 1 and 15'),
    body('nights').isInt({ min: 1, max: 30 }).withMessage('Nights must be between 1 and 30'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const itinerary = itineraries.find(it => it.user === req.params.user);

        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        const stageNumber = Number(req.params.stage);

        if (stageNumber > itinerary.stages.length) {
            return res.status(400).json({ error: 'Invalid stage number' });
        }

        // Verify hostel exists
        const hostelExists = hostels.find(h => h.id == req.body.hostel);
        if (!hostelExists) {
            return res.status(400).json({ error: 'Invalid hostel ID' });
        }

        const updatedStage = {
            stage: stageNumber,
            hostel: Number(req.body.hostel),
            nights: Number(req.body.nights)
        };

        itinerary.stages[stageNumber - 1] = updatedStage;
        res.status(200).json({
            message: 'Stage updated successfully',
            itinerary: itinerary
        });
    }
)

/* DELETE itinerary stage */
router.delete('/itineraries/:user/stages/:stage',
    param('user').trim().isLength({ min: 1 }).withMessage('User name is required'),
    param('stage').isInt({ min: 1 }).withMessage('Stage number must be a positive integer'),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const itinerary = itineraries.find(it => it.user === req.params.user);

        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        const stageNumber = Number(req.params.stage);

        if (stageNumber > itinerary.stages.length) {
            return res.status(400).json({ error: 'Invalid stage number' });
        }

        itinerary.stages.splice(stageNumber - 1, 1);

        // Renumber remaining stages
        itinerary.stages.forEach((stage, index) => {
            stage.stage = index + 1;
        });

        res.status(200).json({
            message: 'Stage deleted successfully',
            itinerary: itinerary
        });
    }
)

module.exports = router;
