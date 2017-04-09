/**
 * @api {get} /getcats/?weight=minWeight&age=minAge Get Cat Information
 * @apiVersion 0.0.1
 * @apiName getCats
 * @apiGroup Cat
 *
 * @apiParam {Number} weight minimum weight of the desired Cats.
 * @apiParam {Number} age minimum age of the desired Cats.
 *
 * @apiSuccess {String} name Name of the Cat.
 * @apiSuccess {Number} age  Age of the Cat.
 * @apiSuccess {String} gender  Gender of the Cat.
 * @apiSuccess {String} color  Color of the Cat.
 * @apiSuccess {Number} weight  Weight of the Cat.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": "1221",
 *       "name": "MeowMaow",
 *       "age": 6,
 *       "gender": "female",
 *       "color": "black",
 *       "weight": 12
 *     },{
 *       "id": 1928,
 *       "name": "MaowMeow",
 *       "age": 18,
 *       "gender": "male",
 *       "color": "Green",
 *       "weight": 38
 *     },{
 *      ...
 *      ]
 *
 * @apiError Could not find matching Cats.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Could not find matching Cats."
 *     }
 */

/**
 * @api {get} /cats/ Get all Cats in Database
 * @apiVersion 0.0.1
 * @apiName cats
 * @apiGroup Cat
 *
 *
 * @apiSuccess {String} name Name of the Cat.
 * @apiSuccess {Number} age  Age of the Cat.
 * @apiSuccess {String} gender  Gender of the Cat.
 * @apiSuccess {String} color  Color of the Cat.
 * @apiSuccess {Number} weight  Weight of the Cat.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": "1221",
 *       "name": "MeowMaow",
 *       "age": 6,
 *       "gender": "female",
 *       "color": "black",
 *       "weight": 12
 *     },{
 *       "id": 1928,
 *       "name": "MaowMeow",
 *       "age": 18,
 *       "gender": "male",
 *       "color": "Green",
 *       "weight": 38
 *     },{
 *      ...
 *      ]
 *
 * @apiError CatNotFound The id of the Cat was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CatNotFound"
 *     }
 */

/**
 * @api {patch} /editcat/:id Edit Cats information
 * @apiVersion 0.0.1
 * @apiName editCat
 * @apiGroup Cat
 *
 *
 * @apiSuccess {String} name Name of the Cat.
 * @apiSuccess {Number} age  Age of the Cat.
 * @apiSuccess {String} gender  Gender of the Cat.
 * @apiSuccess {String} color  Color of the Cat.
 * @apiSuccess {Number} weight  Weight of the Cat.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1221,
 *       "name": "NEWNAME",
 *       "age": 6,
 *       "gender": "female",
 *       "color": "black",
 *       "weight": 12
 *     }
 *
 * @apiError CatNotFound The id of the Cat was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 501 Not Found
 *     {
 *       "error": "Could not patch"
 *     }
 */

/**
 * @api {delete} /deletecat/:id Delete Cat
 * @apiVersion 0.0.1
 * @apiName deleteCat
 * @apiGroup Cat
 *
 * @apiParam {Hash} id id of the soon to be deleted Cat
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError CouldNotDelete
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 501 Not Found
 */

/**
 * @api {post} /addCat/?name=NAME&age=AGE&gender=GENDER&color=COLOR&weight=WEIGHT Add new Cat to Database
 * @apiVersion 0.0.1
 * @apiName addCat
 * @apiGroup Cat
 *
 *
 * @apiSuccess {String} name Name of the Cat.
 * @apiSuccess {Number} age  Age of the Cat.
 * @apiSuccess {String} gender  Gender of the Cat.
 * @apiSuccess {String} color  Color of the Cat.
 * @apiSuccess {Number} weight  Weight of the Cat.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1221,
 *       "name": "Pikku Mau",
 *       "age": 3,
 *       "gender": "male",
 *       "color": "purple",
 *       "weight": 38
 *     }
 *
 * @apiError CouldNotAdd Cat not added
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 501 Not Found
 *     {
 *       "error": "Could not add"
 *     }
 */
