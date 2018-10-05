const Koa = require("koa");
const KoaRouter = require("koa-router");
const app = new Koa();
const router = new KoaRouter();
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

// simple middleware
// app.use(async ctx => (ctx.body = { msg: "hello world" }));

const things = ["motorbikes", "programming", "fishing"];

//body parser
app.use(bodyParser());

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false
});

// routes
router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);

// list of things
async function index(ctx) {
  await ctx.render("index", {
    title: "Things I Love:",
    things: things
  });
}

async function showAdd(ctx) {
  await ctx.render("add");
}

// add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect("/");
}

// route middleware
app.use(router.routes()).use(router.allowedMethods());

router.get("/test", ctx => (ctx.body = "Hello Test"));

app.listen(3000, () => console.log("server started"));
