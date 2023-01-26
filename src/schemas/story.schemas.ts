import Joi from "joi";

const getStoriesByChannelIdSchema = Joi.object({
  channelId: Joi.number().integer().min(1).required(),
});

const getStoriesAfterIdSchema = Joi.object({
  storyId: Joi.number().integer().min(0).required(),
  channelId: Joi.number().integer().min(1).required(),
});

const postStorySchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  body: Joi.string().min(10).max(1000).required(),
  channelId: Joi.number().integer().min(1).required(),
});

const postLikeSchema = Joi.object({
  storyId: Joi.number().integer().min(1).required(),
});

const postCommentSchema = Joi.object({
  text: Joi.string().required(),
});

const allCommentsParamsSchema = postLikeSchema;
const postDenounceParamsSchema = postLikeSchema;
const postDenounceBodySchema = postCommentSchema;

export {
  getStoriesByChannelIdSchema,
  getStoriesAfterIdSchema,
  postStorySchema,
  postLikeSchema,
  postCommentSchema,
  postDenounceParamsSchema,
  postDenounceBodySchema,
  allCommentsParamsSchema,
};
