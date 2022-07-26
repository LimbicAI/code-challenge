import QueryModel from "../models/Query";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import AnswerModel from "../models/Answer";

class QueryController {
  @TryCatchErrorDecorator
  static async index(req, res) {
    const queries = await QueryModel.find().select("_id query");

    res.json(queries);
  }

  @TryCatchErrorDecorator
  static async save(req, res) {
    if (req.body._id) {
      const query = await QueryModel.findOne({ _id: req.body._id });
      query.query = req.body.query;
      await query.save();
    } else {
      const query = new QueryModel({
        query: req.body.query,
      });
      await query.save();
    }
    const queries = await QueryModel.find().select("_id query");
    res.json(queries);
  }

  @TryCatchErrorDecorator
  static async saveAnswer(req, res) {
    const answer = await AnswerModel.findOne({
      user_id: req.body.user_id,
      query_id: req.body.query_id,
    });
    if (answer) {
      answer.answer = req.body.answer;
      await answer.save();
    } else {
      const answer = new AnswerModel({
        user_id: req.body.user_id,
        query_id: req.body.query_id,
        answer: req.body.answer,
      });
      await answer.save();
    }

    var answer_list = [];

    const queries = await QueryModel.find().select("_id query");

    await Promise.all(
      queries.map(async (query, index) => {
        var obj = { _id: query._id, query: query.query };

        const answer = await AnswerModel.findOne({
          user_id: req.body.user_id,
          query_id: query._id,
        });
        if (answer) {
          obj.answer = answer.answer;
        } else {
          obj.answer = "";
        }
        answer_list.push(obj);
      })
    );
    console.log("array test: ", answer_list);
    res.json(answer_list);
  }

  @TryCatchErrorDecorator
  static async indexAnswer(req, res) {
    var answer_list = [];

    const queries = await QueryModel.find().select("_id query");

    await Promise.all(
      queries.map(async (query, index) => {
        var obj = { _id: query._id, query: query.query };

        const answer = await AnswerModel.findOne({
          user_id: req.body.user_id,
          query_id: query._id,
        });
        if (answer) {
          obj.answer = answer.answer;
        } else {
          obj.answer = "";
        }
        answer_list.push(obj);
      })
    );
    console.log("array test: ", answer_list);
    res.json(answer_list);
  }

  @TryCatchErrorDecorator
  static async delete(req, res) {
    const query = await QueryModel.findOne({ _id: req.body._id });
    if (query) {
      await query.delete();
    }
    const queries = await QueryModel.find().select("_id query");
    res.json(queries);
  }
}

export default QueryController;
