alter table "public"."answers" drop constraint "answers_question_id_fkey",
  add constraint "Answers_question_id_fkey"
  foreign key ("question_id")
  references "public"."questions"
  ("id") on update restrict on delete restrict;
