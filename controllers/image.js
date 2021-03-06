const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '2a14721405544f5faa8023819595d17e'
});

const handleApicall = (req ,res) =>{
       	app.models
	     .predict(
		      	Clarifai.FACE_DETECT_MODEL,
		      	req.body.input
	      )
	     .then(data=>{
	     	res.json(data);
	     })
	     .catch(err => res.status(400).json('problem in api call'))

      }

const handleimage = (req,res,db) => {
	const { id } = req.body;
	db('users').where('id', '=' , id)
	.increment('entries',1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to count entries                                                           '))

}
module.exports = {
	handleimage: handleimage ,
	handleApicall: handleApicall
};