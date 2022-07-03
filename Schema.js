const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
	message : String,
	date : String,
	from : String,
	to : String,
	fromName : String,
	toName : String,
	cls : String,
	adm : String,
	fromRole : String,
	createdAt : String,
});


const studentSchema = new mongoose.Schema({
	admNo:String,
	cls:String,
	sec:String,
	pass:String,
	sName:String,
	fName:String,
	mName:String,
	fNum:String,
	mNum:String,
	dob:String,
	doa:String,
	house:String,
	session: String,
	address:String,
	halfenglishRhymes:String,
	halfenglishConversation:String,
	halfenglishOral:String,
	halfenglishHandwriting:String,
	halfenglishWrittenOne:String,
	halfenglishWrittenTwo:String,
	halfhindiRhymes:String,
	halfhindiOral:String,
	halfhindiHandwriting:String,
	halfhindiWritten:String,
	halfsanskrit:String,
	halfmathsOral:String,
	halfmathsWritten:String,
	halfphysics:String,
	halfchemistry:String,
	halfbiology:String,
	halfhistory:String,
	halfgeography:String,
	halfgenScience:String,
	halfsocScience:String,
	halfcomputer:String,
	halfcommerce:String,
	halfdrawing:String,
	halfgenKnowledge:String,
	halfmoralScience:String,
	halfattendence:String,
	halfpercentage:String,
	halfmanners:{
		behaviour:String,
		neatnessOfWork:String,
		punctuality:String,
		coCirricular:String
	},
	annualenglishRhymes:String,
	annualenglishConversation:String,
	annualenglishOral:String,
	annualenglishHandwriting:String,
	annualenglishWrittenOne:String,
	annualenglishWrittenTwo:String,
	annualhindiRhymes:String,
	annualhindiOral:String,
	annualhindiHandwriting:String,
	annualhindiWritten:String,
	annualsanskrit:String,
	annualmathsOral:String,
	annualmathsWritten:String,
	annualphysics:String,
	annualchemistry:String,
	annualbiology:String,
	annualhistory:String,
	annualgeography:String,
	annualgenScience:String,
	annualsocScience:String,
	annualcomputer:String,
	annualdrawing:String,
	annualgenKnowledge:String,
	annualmoralScience:String,
	annualattendence:String,
	annualpercentage:String,
	annualmanners:{
		behaviour:String,
		neatnessOfWork:String,
		punctuality:String,
		coCirricular:String
	},
	fee : String
});


const teacherSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	imgLink:{
		type:String,
		required:true
	},
	cls:{
		type:String,
		required:true
	},
	sec:{
		type:String,
		required:true
	},
	clsess:{
		type:Array,
		required:true
	},
	subjects:{
		type:Array,
		required:true
	},
	addr:{
		type:String,
		required:true
	},
	phone:{
		type:String,
		required:true
	},
	adhar:{
		type:String,
		required:true
	},
	doj:{
		type:String,
		required:true
	},
	dob:{
		type:String,
		required:true
	}
});


module.exports = {chatSchema, studentSchema, teacherSchema};