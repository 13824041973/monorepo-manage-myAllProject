(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('core-js/modules/esnext.async-iterator.for-each.js'), require('core-js/modules/esnext.iterator.constructor.js'), require('core-js/modules/esnext.iterator.for-each.js'), require('koa'), require('koa-router'), require('koa-bodyparser'), require('@koa/cors'), require('core-js/modules/esnext.async-iterator.reduce.js'), require('core-js/modules/esnext.iterator.reduce.js'), require('jsonwebtoken'), require('core-js/modules/es.array.push.js')) :
    typeof define === 'function' && define.amd ? define(['core-js/modules/esnext.async-iterator.for-each.js', 'core-js/modules/esnext.iterator.constructor.js', 'core-js/modules/esnext.iterator.for-each.js', 'koa', 'koa-router', 'koa-bodyparser', '@koa/cors', 'core-js/modules/esnext.async-iterator.reduce.js', 'core-js/modules/esnext.iterator.reduce.js', 'jsonwebtoken', 'core-js/modules/es.array.push.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(null, null, null, global.Koa, global.Router, global.bodyParser, global.cors, null, null, global.jwt));
})(this, (function (esnext_asyncIterator_forEach_js, esnext_iterator_constructor_js, esnext_iterator_forEach_js, Koa, Router, bodyParser, cors, esnext_asyncIterator_reduce_js, esnext_iterator_reduce_js, jwt) { 'use strict';

    // 加密的盐
    const SALT = 'LuyolG';
    const signature = user => jwt.sign(user, SALT, {
      expiresIn: '1h' // 1小时过期
    });
    const verify = async token => {
      return new Promise(resolove => {
        if (token) {
          jwt.verify(token, SALT, (err, data) => {
            if (err) {
              console.log('@err', err);
              resolove({
                // status: 'failed'
                status: 'success',
                msg: 'token过期'
              });
            } else {
              resolove({
                status: 'success',
                data
              });
            }
          });
        } else {
          resolove({
            status: 'failed',
            message: 'Token 不能为空'
          });
        }
      });
    };
    const jwtVerify = whiteList => async (ctx, next) => {
      if (whiteList.includes(ctx.path)) {
        next(ctx);
      } else {
        let token;
        try {
          token = ctx.request.headers.authorization.split("Bearer ")[1];
        } catch (error) {}
        const res = await verify(token);
        if (res.status === 'success') {
          console.log("@@@本次请求接口的用户为：", res);
          next(ctx);
        } else {
          ctx.body = {
            ...res,
            code: 401
          };
        }
      }
    };

    class UserService {
      async validate({
        username,
        password
      }) {
        if (username && password) {
          if (username === 'lyl' || username === 'LuyolG') {
            if (password === '123456') {
              const token = signature({
                username
              });
              return {
                code: 200,
                msg: '登录成功',
                status: 'success',
                data: {
                  token
                }
              };
            }
            return {
              code: 200,
              msg: '密码错误',
              status: 'failed'
            };
          }
          return {
            code: 200,
            msg: '账号未注册',
            status: 'failed'
          };
        }
        return {
          code: 200,
          msg: '账密不能为空',
          status: 'failed'
        };
      }
    }

    const RequestMethod = {
      GET: "get",
      POST: "post"
    };
    function Controller(prefix = "") {
      return function (target) {
        target.prefix = prefix;
      };
    }
    const controllers = [];
    function RequestMapping(method = "", url = "") {
      return function (target, propKey, descriptor) {
        let path = url || '\\' + `${propKey}`;
        const item = {
          path,
          method,
          handler: target[propKey],
          constructor: target.constructor
        };
        controllers.push(item);
      };
    }

    var _dec$1, _dec2, _dec3, _class$1, _class2;
    function _applyDecoratedDescriptor$1(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
    let UserController = (_dec$1 = Controller("/user"), _dec2 = RequestMapping(RequestMethod.GET, "/all"), _dec3 = RequestMapping(RequestMethod.POST, "/login"), _dec$1(_class$1 = (_class2 = class UserController {
      async getAllUser(ctx) {
        ctx.body = {
          data: ["lyl", "krl", "qsj"]
        };
      }
      async loginUser(ctx) {
        const {
          body
        } = ctx.request;
        const userService = new UserService();
        ctx.body = await userService.validate(body);
      }
    }, (_applyDecoratedDescriptor$1(_class2.prototype, "getAllUser", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getAllUser"), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, "loginUser", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype)), _class2)) || _class$1);

    const list1 = [{
      "id": "6_1721528635.890",
      "type": "feed",
      "offset": 6,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528635,
      "updated_time": 1721528635,
      "target": {
        "id": 2944690156,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/2944690156",
        "author": {
          "id": "df7c702d684c99b84875e4c7562c87fc",
          "url": "https://api.zhihu.com/people/df7c702d684c99b84875e4c7562c87fc",
          "user_type": "people",
          "url_token": "xun-meng-70-56-23",
          "name": "人间凡夫",
          "headline": "没有美食，生活将黯淡无光。",
          "avatar_url": "https://pic1.zhimg.com/50/v2-fa581c2236838a8d26c6fbd6ab7d69cb_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 10541,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1679287355,
        "updated_time": 1679287355,
        "voteup_count": 23452,
        "thanks_count": 4611,
        "comment_count": 1028,
        "is_copyable": false,
        "question": {
          "id": 566420596,
          "type": "question",
          "url": "https://api.zhihu.com/questions/566420596",
          "author": {
            "id": "0a071b5fe37c97b431eea7a2cff48b9e",
            "url": "https://api.zhihu.com/people/0a071b5fe37c97b431eea7a2cff48b9e",
            "user_type": "people",
            "url_token": "wang-yuan-hui-14",
            "name": "森美",
            "headline": "世间情动，不过盛夏白瓷梅子汤，碎冰碰壁叮当响。",
            "avatar_url": "https://picx.zhimg.com/50/v2-4715c26811b20ba53361fae136f0e387_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 28786,
            "is_following": false,
            "is_followed": false
          },
          "title": "最令你醍醐灌顶的一句话是什么？",
          "created": 1668314114,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 21,
          "bound_topic_ids": [7490, 24048, 410903],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "最让我醍醐灌顶的一句话，是我跟最好的哥们喝酒时他跟我说的:“无论是什么关系，提供不了情绪价值，给予不了经济支持，给不了正面陪伴，三点不占一样，舍弃才是明智之举。” 当时我跟我女朋友吵架了，听完他跟我说的话，我现在跟我新女友过的挺好的，准备今年结婚。",
        "excerpt_new": "最让我醍醐灌顶的一句话，是我跟最好的哥们喝酒时他跟我说的:“无论是什么关系，提供不了情绪价值，给予不了经济支持，给不了正面陪伴，三点不占一样，舍弃才是明智之举。” 当时我跟我女朋友吵架了，听完他跟我说的话，我现在跟我新女友过的挺好的，准备今年结婚。",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "disallowed",
        "content": "<p data-pid=\"Jmpf260P\">最让我醍醐灌顶的一句话，是我跟最好的哥们喝酒时他跟我说的:“无论是什么关系，提供不了情绪价值，给予不了经济支持，给不了正面陪伴，三点不占一样，舍弃才是明智之举。”</p><p data-pid=\"kJQpL1s7\">当时我跟我女朋友吵架了，听完他跟我说的话，我现在跟我新女友过的挺好的，准备今年结婚。</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": true,
        "visited_count": 2581923,
        "favorite_count": 14781,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 2944690156}",
      "attached_info": "Co0FCLP1/9besZbOkAEQBBoJNTY1NDgyNTg0ILvI36AGKJy3ATCECEAGSigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9Wgg4ODE1MzY4MWIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjI5NDQ2OTAxNTaKAQk1NjY0MjA1OTaqAQlyZWNvbW1lbmTCASBkZjdjNzAyZDY4NGM5OWI4NDg3NWU0Yzc1NjJjODdmY/IBCggMEgZOb3JtYWzyASgIChIkMDJmZDJiMDAtYzQ4OS00ZjZiLWJjNzItZjI0OGMyZWU0NDRm8gEFCAsSATKCAgCIApGe6ZiNMpICIGRmN2M3MDJkNjg0Yzk5Yjg0ODc1ZTRjNzU2MmM4N2ZjmgIAygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxlygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCE1RTX1NPVVJDRV9GRUVEUkVfVjjoAgL6AgtOT1JNQUxfRkxPV4oDIGJhMDIwNDcwMGZjNjQ4NDBiYjhmOTgyYTJhYmNmMjBlmgMNCgJ2MBAAGgVvdGhlcqgDo8udAdgDAOoDCWZlZWRyZV92OPoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAABAdmzGP4EFAAAAAAAAAACJBTdQHL4ZLp0/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQKQBgCSAiUKCTU2NTQ4MjU4NBIKMjk0NDY5MDE1NhgEIgpJTUFHRV9URVhU",
      "action_card": false
    }, {
      "id": "7_1721528635.139",
      "type": "feed",
      "offset": 7,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528635,
      "updated_time": 1721528635,
      "target": {
        "id": 3212567357,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3212567357",
        "author": {
          "id": "1965a432eaa305def333d62e322bc900",
          "url": "https://api.zhihu.com/people/1965a432eaa305def333d62e322bc900",
          "user_type": "people",
          "url_token": "niu-niu-49-78-27",
          "name": "爱折腾的牛牛",
          "headline": "知势榜上榜答主，母婴｜美食｜家居，分享各种美好有趣的事物",
          "avatar_url": "https://picx.zhimg.com/50/v2-5a15083636338f3909ffa117bdc83290_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 0,
          "badge": [{
            "type": "super_activity",
            "description": "2023 城市发现官"
          }],
          "followers_count": 12305,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1694768805,
        "updated_time": 1694786852,
        "voteup_count": 779,
        "thanks_count": 220,
        "comment_count": 38,
        "is_copyable": false,
        "question": {
          "id": 22937279,
          "type": "question",
          "url": "https://api.zhihu.com/questions/22937279",
          "author": {
            "id": "9b4825abd0f7a429f2603d4e5b4543a8",
            "url": "https://api.zhihu.com/people/9b4825abd0f7a429f2603d4e5b4543a8",
            "user_type": "people",
            "url_token": "li-yao-lin-34",
            "name": "G010",
            "headline": "此人很懒，什么都没有留下",
            "avatar_url": "https://pica.zhimg.com/50/v2-a953b4172db71d3ff39576c22785bd86_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 6,
            "is_following": false,
            "is_followed": false
          },
          "title": "程序员工作只能做到 35 岁吗？之后的路是怎么走的呢?",
          "created": 1393996415,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 17,
          "bound_topic_ids": [707, 7897, 181741],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "thumbnail": "https://picx.zhimg.com/50/v2-aaa42b01339ee739ccaec985b1dced5a_720w.jpg?source=b6762063",
        "excerpt": "当然不是。老板也不是傻子，假如一人就能搞定过去一个多工种团队才能搞定的事情，大大地节约公司人力成本，老板只会想尽办法地留人，又怎会把人才往外推呢？ 本人也是计算机专业毕业，在互联网公司呆了多年，身边有不少程序员朋友在35岁后仍在领域深耕的。 而我所了解的很多互联网公司里面的技术专家和架构师，他们的年龄其实也都蛮大的，35岁以上几乎占大部分，但作为公司的中流砥柱，他们并不担心被裁员的问题。 因此，没必要…",
        "excerpt_new": "当然不是。老板也不是傻子，假如一人就能搞定过去一个多工种团队才能搞定的事情，大大地节约公司人力成本，老板只会想尽办法地留人，又怎会把人才往外推呢？ 本人也是计算机专业毕业，在互联网公司呆了多年，身边有不少程序员朋友在35岁后仍在领域深耕的。 而我所了解的很多互联网公司里面的技术专家和架构师，他们的年龄其实也都蛮大的，35岁以上几乎占大部分，但作为公司的中流砥柱，他们并不担心被裁员的问题。 因此，没必要…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "need_payment",
        "content": "<p data-pid=\"BbtFPknu\"><b>当然不是。</b></p><p data-pid=\"y2v94to3\">老板也不是傻子，假如一人就能搞定过去一个多工种团队才能搞定的事情，大大地节约公司人力成本，老板只会想尽办法地留人，又怎会把人才往外推呢？</p><p data-pid=\"76Pt9cVZ\">本人也是计算机专业毕业，在互联网公司呆了多年，身边有不少程序员朋友在35岁后仍在领域深耕的。</p><p data-pid=\"7g6x__EE\">而我所了解的很多互联网公司里面的技术专家和架构师，他们的年龄其实也都蛮大的，35岁以上几乎占大部分，但作为公司的中流砥柱，他们并不担心被裁员的问题。</p><p data-pid=\"ZC0mF15D\">因此，没必要被这种煽动起来的焦虑干扰到自己工作的正常抉择，否则只会得不偿失。</p><h2>那么，程序员35岁后都去干嘛了？</h2><p data-pid=\"bWrJTcHN\">程序员到了35岁后，其实和其他领域的专业技术人员差不多，之后的路要么走管理路线，要么就是继续走专家路线。</p><h3>1.管理路线：</h3><p data-pid=\"Mg7JkMw-\">大致的晋升路径：项目组长-&gt;项目经理-&gt;技术总监-&gt;CTO</p><p data-pid=\"Y5XOdf32\">例如项目经理、产品经理、研发部门经理等管理岗位，对于程序员来说，管理能力的学习可以通过考认可度高的PMP。</p><p data-pid=\"9F8VtMj0\">当程序员参加过多个项目开发，有了前期的经验技术和人脉资源积累后，管理岗无疑是一个不错的发展方向，可以在这个岗位上长久工作下去，并且还有向更高层（总监级别）提升的可能。</p><p data-pid=\"sINQhnkg\">我的一位大学同学就是这样，看着他从毕业进入了那家公司实习，一直做到现在十几年了，从普通的一名程序员逐渐地做到了公司的技术总监。</p><p data-pid=\"Oy5U9yCP\">不过这种类型的岗位需要时常和人进行沟通交流甚至谈判，对于许多不太适应和人打交道的程序员来说，并不一定适合，因此很大部分朋友会选择继续在领域深耕，走专业路线。</p><h3>2.专家路线：</h3><p data-pid=\"qNqBmgh4\">大致的晋升路径：初级工程师→中级工程师→高级工程师→架构师</p><p data-pid=\"qPfg6ItO\">相对于管理路线，更多的程序员会选择这条路线，继续和机器打交道，提升自己的专业能力，向难度更高的岗位发展。</p><p data-pid=\"Jp8sSIRo\">例如一名优秀的架构师需要掌握Java、Python、Go等编程语言以及各种数据库、缓存、消息队列等技术和各种框架、工具的使用方法，此外还需要深入研究这些技术的底层原理，以便更好地解决各种技术问题。</p><p data-pid=\"-F7_YBPK\">像从事架构师、大数据工程师、嵌入式系统工程师、云计算工程师等职业的朋友，他们的岗位相对稳定很多。因为岗位门槛高，可替代性大大减少。</p><p data-pid=\"OQaty4yL\">35岁的程序员虽然也会面临年龄劣势，但随着AI大模型的出现，乐于拥抱变化，不断学习新技术、提高软技能的程序员将更加容易在AI红利期获得更多。</p><h2>程序员如何规划，才能“吃”一辈子</h2><p data-pid=\"svyPY4yV\">聊下个人看法，希望可以给题主一些启发。</p><h3>一、提前规划好自己的职业路线：</h3><p data-pid=\"vS26U-Nl\"><b>有句话叫：长期看兴趣，中期看行业，短期看公司。</b></p><p data-pid=\"W62WRpjI\">题主在问题描述中表示一直想做计算机，那说明对这个行业是有一定兴趣的。</p><p data-pid=\"wHrpSRoY\">人是有惰性的，而兴趣却可以帮你克服惰性。</p><p data-pid=\"a-GoSFfA\">如果自己从事的工作是自己喜欢的，那干起活来也会开心很多，起码不会觉得枯燥无味甚至抵触，既然一直想从事计算机行业，那就大胆去做吧。</p><p data-pid=\"qiT11WLe\">每个行业都会有一定的沉淀期，<b>找工作记得不要找只长年纪不涨技术的 。刚开始辛苦点，多接触项目，对后续的经验积累和人脉资源都有好处。</b></p><p data-pid=\"S_oXOdcQ\">以当前的就业环境，35岁危机是大家在职场上面临的普遍问题，想要安稳迈过这道坎，必须提前做好自己的职业规划。</p><p data-pid=\"3lB2B_vo\">虽说计划赶不上变化，但起码对自己的兴趣、优势和性格有所了解，才能更加容易地找到自己的定位和目标。</p><h3>二、未雨绸缪</h3><p data-pid=\"QLHu4_Pw\">现实中大部分人在35岁刚好处于一个「上有老，下有小」的阶段，比起刚进公司的年轻人，会多了不少来自家庭的牵绊和顾虑；再加上精力和体力不比年轻时，要加班熬起夜来肯定也熬不过年轻人。</p><p data-pid=\"f5WTLM4d\">换做以前，或许还有个相对的优势叫做「行业多年的的宝贵经验」。</p><p data-pid=\"H9Os3szs\">但面临即将到来的AI时代，随着AI技术的发展，许多现成的模型、框架越来越多，而AI大模型自己就有广泛的知识和一些基础的推理能力，比当年需要程序员自己慢慢实践学习的效率显得更高更快。</p><p class=\"ztext-empty-paragraph\"><br/></p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-529972d917eafb819aa03dfd2f4bd2c0_b.jpg\" data-rawwidth=\"1080\" data-rawheight=\"956\" data-size=\"normal\" data-original-token=\"v2-1f475de9351ea3c808326b24fadabff8\" data-default-watermark-src=\"https://pic2.zhimg.com/v2-59ea4d66872ced30f9bf0a4da3bfcd93_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"1080\" data-original=\"https://pic3.zhimg.com/v2-529972d917eafb819aa03dfd2f4bd2c0_r.jpg\"/></figure><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"6fZ5CR3v\">想单凭经验就在行业立足的可能性只会越来越小，因为在不久的将来，AI轻易就能取代这方面的优势。</p><p data-pid=\"BAKXyygL\"><b>所谓「打不过就加入」。</b></p><p data-pid=\"19JQcUn5\">在人工智能时代的浪潮下，未雨绸缪主动去学习，才能更加容易找到新的机会。而程序员其实才是能从AI浪潮中赚取最大红利的那批人。</p><p data-pid=\"zeA59fOX\">最近「知乎知学堂」联合「AGI课堂」推出的短期公开课，课名叫【程序员的AI大模型进阶之旅】，<b>感兴趣的朋友们可以点击下面链接，免费领取两天的体验课程。</b></p><a data-draft-node=\"block\" data-draft-type=\"edu-card\" data-edu-card-id=\"1686063108278296576\"></a><p data-pid=\"vqKKY_7c\"><b>你将获得诸如「独立训练大模型、用最优方案独立开发AI产品」此类的能力。相信可以对大家未来的职业生涯规划有所启发。</b></p><p data-pid=\"jcn4u-HJ\"><b>同时记得点进去加下老师的微信，完成公开课后，你还可以免费获得一份AI 大模型资料包，和无需翻墙的好用AI工具名称和网址。</b></p><h3> 三、制造壁垒，拥抱变化</h3><p data-pid=\"HMEOeugN\">在商业环境巨变的时代，当你拥有「系统思考」的能力，就能拥有真正的全局观，可以站在未来看今日。</p><p data-pid=\"f8681RaL\">与其终日惶惶、提心吊胆纠结担心哪天失业，倒不如增加自己抵御风险的资本，筑起保护自己的壁垒。</p><p data-pid=\"p1vRVaNP\">畅销书《底层逻辑》作者、著名商业资讯顾问刘润先生曾经说过：</p><blockquote data-pid=\"gNHtGSYw\">学习编程，有两种原因。<br/>第一，编程是学习和机器对话的语言，虽然还会有很多和人打交道的时候，但未来我们更多会和机器去交流，学会编程，就像学会了英语一样，有了一张通往更广阔世界的门票。<br/>第二，编程可以培养一样很重要的思维模式，叫多层次思维。</blockquote><p data-pid=\"anHr5cfj\">学习编程可以训练搭建系统架构的能力，这也是一种基于信息规律的系统思考能力。纵观现代改变世界体验的人，大多数都是会编程的，例如乔布斯、拉里·埃里森、雷军等大佬，都是编程训练的思维。</p><p data-pid=\"x8cZnpWJ\">曾经和一位资深的35+程序员朋友聊过关于职业的问题，当时他也表示人到中年，无可避免的也会考虑到转型的问题，但这种编程思维所培养的学习能力，即使将来不在这个行业，也能让他们在其他行业找到一席之地，因为这是程序员这个职业带给他的底气。</p><p data-pid=\"B7V3wna1\">综上，IT行业虽说更新迭代速度很快，但淘汰的不是人云亦云的「35岁」。</p><p data-pid=\"sHciAeh6\">坚持「学习+积累+实践」，作为程序员一样可以在自己的领域扎根站稳，走得更远。</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 424690,
        "thumbnails": ["https://picx.zhimg.com/50/v2-aaa42b01339ee739ccaec985b1dced5a_720w.jpg?source=b6762063"],
        "favorite_count": 997,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3212567357}",
      "attached_info": "CsoFCLP1/9besZbOkAEQBBoJNjE0MTg0ODI3IKW9kKgGKIsGMCZAB0ovCiRUU19TT1VSQ0VfRURVX1RSQUlOSU5HX0lOVEVSRVNUX1dPUkQSATAYACAAOgBaBzEzNTU3MzZiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgozMjEyNTY3MzU3igEIMjI5MzcyNzmqAQlyZWNvbW1lbmTCASAxOTY1YTQzMmVhYTMwNWRlZjMzM2Q2MmUzMjJiYzkwMPIBDAgMEghUcmFpbmluZ/IBKAgKEiQ3YjRlNjQ4Ny1jYTc0LTQ1NjQtODJiYy1mMzM4MmQ1MjQ3YTHyAQUICxIBMoICAIgCkZ7pmI0ykgIgMTk2NWE0MzJlYWEzMDVkZWYzMzNkNjJlMzIyYmM5MDCaAgDKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxlygIOQ3VycmVuY3lSYW5rZXLKAg5zbG90SW5zZXJ0UnVsZdoCJFRTX1NPVVJDRV9FRFVfVFJBSU5JTkdfSU5URVJFU1RfV09SROgCBPoCC05PUk1BTF9GTE9XigMgYmEwMjA0NzAwZmM2NDg0MGJiOGY5ODJhMmFiY2YyMGWaAw0KAnYwEAAaBW90aGVyqAPy9RnYAwDqAxFlZHVfaW50ZXJlc3Rfd29yZPoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABAGIBACSBAhUcmFpbmluZ5oEATSgBACoBACwBAC6BAJhacIEAzQwMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkExNWxRxHGsj+BBXQZNT8l9zRBiQU3UBy+GS6dP5IFAJoFA2RmdKIFA2RmdLIFATG5BauWQi0PrrNA0AUA4AUA6AUA8AUCkAYAkgIlCgk2MTQxODQ4MjcSCjMyMTI1NjczNTcYBCIKSU1BR0VfVEVYVA==",
      "action_card": false
    }, {
      "id": "8_1721528635.423",
      "type": "feed",
      "offset": 8,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528635,
      "updated_time": 1721528635,
      "target": {
        "id": 3562546440,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3562546440",
        "author": {
          "id": "e2bd478e240b68bc3373a26392d90534",
          "url": "https://api.zhihu.com/people/e2bd478e240b68bc3373a26392d90534",
          "user_type": "people",
          "url_token": "jing-du-mao-ting",
          "name": "拉蒂兹",
          "headline": "",
          "avatar_url": "https://picx.zhimg.com/50/v2-d82debd89352cb917cc698b5f96991de_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 4494,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1721024228,
        "updated_time": 1721024228,
        "voteup_count": 4161,
        "thanks_count": 74,
        "comment_count": 507,
        "is_copyable": true,
        "question": {
          "id": 421926121,
          "type": "question",
          "url": "https://api.zhihu.com/questions/421926121",
          "author": {
            "id": "a1652936c11f7313ed25d366018d22a9",
            "url": "https://api.zhihu.com/people/a1652936c11f7313ed25d366018d22a9",
            "user_type": "people",
            "url_token": "lu-yao-51-72",
            "name": "文君",
            "headline": "一个人，一座城，一段时光，一些故事",
            "avatar_url": "https://picx.zhimg.com/50/v2-00b69cce7ebbd36f22793cbefe3c5da8_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 26,
            "is_following": false,
            "is_followed": false
          },
          "title": "为什么现在骑行圈变了味道？",
          "created": 1600516020,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 69,
          "bound_topic_ids": [8879, 22234, 50321, 67609, 152097],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "大一社团招新，进了个滑板社。第一次面基开全员会，一个副社长讲话到最后，说“还没滑板的同学千万不要在网上随便买个几十百把块钱的玩具板，一定要买专业的。社团这边可以帮忙团购，会后登记签字，批量买有折扣”。 大会结尾，社团邀请了一个校外高玩，上台表演特技。表演前那人说：不用区分什么专业板玩具板，你只要热爱这个，哪怕自己拿块木板打几个轮子一样的玩。 不光是骑行圈，任何圈子都这样。只要热爱，共享单车也能骑行…",
        "excerpt_new": "大一社团招新，进了个滑板社。第一次面基开全员会，一个副社长讲话到最后，说“还没滑板的同学千万不要在网上随便买个几十百把块钱的玩具板，一定要买专业的。社团这边可以帮忙团购，会后登记签字，批量买有折扣”。 大会结尾，社团邀请了一个校外高玩，上台表演特技。表演前那人说：不用区分什么专业板玩具板，你只要热爱这个，哪怕自己拿块木板打几个轮子一样的玩。 不光是骑行圈，任何圈子都这样。只要热爱，共享单车也能骑行…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"X6vdnNRa\">大一社团招新，进了个滑板社。第一次面基开全员会，一个副社长讲话到最后，说“还没滑板的同学千万不要在网上随便买个几十百把块钱的玩具板，一定要买专业的。社团这边可以帮忙团购，会后登记签字，批量买有折扣”。</p><p data-pid=\"XvEiIwN-\">大会结尾，社团邀请了一个校外高玩，上台表演特技。表演前那人说：不用区分什么专业板玩具板，你只要热爱这个，哪怕自己拿块木板打几个轮子一样的玩。</p><p data-pid=\"heHdfqaG\">不光是骑行圈，任何圈子都这样。只要热爱，共享单车也能骑行。</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 320248,
        "favorite_count": 96,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3562546440}",
      "attached_info": "CuwECLP1/9besZbOkAEQBBoJNjc3ODA2NzY2IOT90rQGKMEgMPsDQAhKKAoTVFNfU09VUkNFX0ZFRURSRV9WOBIBMBgAIAA6CnsicmF3IjoiIn1aCDU2MDM5ODA0YiA0NzI0NDI3MDEzMTc4YzcxNDViNmY1N2JjYzYyZjUxYXIKMzU2MjU0NjQ0MIoBCTQyMTkyNjEyMaoBCXJlY29tbWVuZMIBIGUyYmQ0NzhlMjQwYjY4YmMzMzczYTI2MzkyZDkwNTM08gEKCAwSBk5vcm1hbPIBKAgKEiQzMjRhMjQ3Mi00ZTkzLTQ1ZTktYTYwYi1iYThmYzA3NjMzNjLyAQUICxIBMoICAIgCkZ7pmI0ykgIgZTJiZDQ3OGUyNDBiNjhiYzMzNzNhMjYzOTJkOTA1MzSaAgDKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxl2gITVFNfU09VUkNFX0ZFRURSRV9WOOgCAvoCC05PUk1BTF9GTE9XigMgYmEwMjA0NzAwZmM2NDg0MGJiOGY5ODJhMmFiY2YyMGWaAw0KAnYwEAAaBW90aGVyqAP4xRPYAwDqAwlmZWVkcmVfdjj6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAjMwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAACgV3XAP4EFAAAAAAAAAACJBTdQHL4ZLp0/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQKQBgCSAiUKCTY3NzgwNjc2NhIKMzU2MjU0NjQ0MBgEIgpJTUFHRV9URVhU",
      "action_card": false
    }, {
      "id": "9_1721528635.346",
      "type": "feed",
      "offset": 9,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528635,
      "updated_time": 1721528635,
      "target": {
        "id": 3491317072,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3491317072",
        "author": {
          "id": "5890e62346bcaebd521ea97168986e88",
          "url": "https://api.zhihu.com/people/5890e62346bcaebd521ea97168986e88",
          "user_type": "people",
          "url_token": "zero-53-63",
          "name": "lemon tree",
          "headline": "",
          "avatar_url": "https://picx.zhimg.com/50/v2-b60fecf5712e28bc47b5039865d14434_l.jpg?source=b6762063",
          "is_org": false,
          "gender": -1,
          "followers_count": 27,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1715142022,
        "updated_time": 1715142022,
        "voteup_count": 1549,
        "thanks_count": 44,
        "comment_count": 362,
        "is_copyable": true,
        "question": {
          "id": 633375697,
          "type": "question",
          "url": "https://api.zhihu.com/questions/633375697",
          "author": {
            "id": "78da6ac41532fe74ac535de8c61d7fe6",
            "url": "https://api.zhihu.com/people/78da6ac41532fe74ac535de8c61d7fe6",
            "user_type": "people",
            "url_token": "e-e-35-88-12",
            "name": "有猫饼吧你",
            "headline": "",
            "avatar_url": "https://pic1.zhimg.com/50/v2-49b6b6e94d031afc3b66d7ca71274ef8_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 12,
            "is_following": false,
            "is_followed": false
          },
          "title": "报警后感觉警察这个岗位作用不大?",
          "created": 1701756181,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 13,
          "bound_topic_ids": [215, 7381, 15555, 17943],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "你敢信都特么2024年了，丢了电动车，报完警，警察私下偷偷对受害者说，这群人抓不得。怕抓完放出来后，小偷出来杀人放火？",
        "excerpt_new": "你敢信都特么2024年了，丢了电动车，报完警，警察私下偷偷对受害者说，这群人抓不得。怕抓完放出来后，小偷出来杀人放火？",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"F5doIAxh\">你敢信都特么2024年了，丢了电动车，报完警，警察私下偷偷对受害者说，这群人抓不得。怕抓完放出来后，小偷出来杀人放火？</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 313453,
        "favorite_count": 122,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3491317072}",
      "attached_info": "Cu4ECLP1/9besZbOkAEQBBoJNjY0ODU3ODAxIIb767EGKI0MMOoCQAlKKAoTVFNfU09VUkNFX0ZFRURSRV9WOBIBMBgAIAA6CnsicmF3IjoiIn1aCTEwMzAyODcwOWIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjM0OTEzMTcwNzKKAQk2MzMzNzU2OTeqAQlyZWNvbW1lbmTCASA1ODkwZTYyMzQ2YmNhZWJkNTIxZWE5NzE2ODk4NmU4OPIBCggMEgZOb3JtYWzyASgIChIkN2E2MDY5NzMtNjI2Mi00MjFhLWI2MmUtZmI0NjdiYmQwNjFk8gEFCAsSATKCAgCIApGe6ZiNMpICIDU4OTBlNjIzNDZiY2FlYmQ1MjFlYTk3MTY4OTg2ZTg4mgIAygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCE1RTX1NPVVJDRV9GRUVEUkVfVjjoAgL6AgtOT1JNQUxfRkxPV4oDIGJhMDIwNDcwMGZjNjQ4NDBiYjhmOTgyYTJhYmNmMjBlmgMNCgJ2MBAAGgVvdGhlcqgD7ZAT2AMA6gMJZmVlZHJlX3Y4+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAMxNjDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAAA5cL0/gQUAAAAAAAAAAIkFN1AcvhkunT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFApAGAJICJQoJNjY0ODU3ODAxEgozNDkxMzE3MDcyGAQiCklNQUdFX1RFWFQ=",
      "action_card": false
    }, {
      "id": "10_1721528635.526",
      "type": "feed",
      "offset": 10,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528635,
      "updated_time": 1721528635,
      "target": {
        "id": 3270699180,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3270699180",
        "author": {
          "id": "49d887d9671861f21479a6cdcca81d51",
          "url": "https://api.zhihu.com/people/49d887d9671861f21479a6cdcca81d51",
          "user_type": "people",
          "url_token": "zi-yun-fei",
          "name": "紫云飞",
          "headline": "JavaScript 考古学家",
          "avatar_url": "https://pica.zhimg.com/50/v2-cb307218899f324598573c2fa634be8c_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "badge": [{
            "type": "zhihu_yearly_answerer",
            "description": "2022 年度新知答主"
          }, {
            "type": "best_answerer",
            "description": "前端开发话题下的优秀答主",
            "topic_names": ["前端开发"],
            "topic_ids": [225]
          }],
          "followers_count": 25021,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1698677852,
        "updated_time": 1698677852,
        "voteup_count": 546,
        "thanks_count": 76,
        "comment_count": 32,
        "is_copyable": true,
        "question": {
          "id": 627670924,
          "type": "question",
          "url": "https://api.zhihu.com/questions/627670924",
          "author": {
            "id": "6c78379afcdc5f540827c08b20982a25",
            "url": "https://api.zhihu.com/people/6c78379afcdc5f540827c08b20982a25",
            "user_type": "people",
            "url_token": "ei-hei-02",
            "name": "欸嘿",
            "headline": "",
            "avatar_url": "https://picx.zhimg.com/50/v2-ef12a1cf1b7c46064c6bff4541689585_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 5,
            "is_following": false,
            "is_followed": false
          },
          "title": "JavaScript 中 await 永远不会 resolve 的 Promise 会导致内存泄露吗？",
          "created": 1698167833,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 0,
          "bound_topic_ids": [769, 23355, 159545],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "前几年回答过一次这个问题，再重新回答一次。 想要知道 promise 对象有没有被回收掉，可以在控制台使用 queryObjects() ：   queryObjects(Promise) 做的是就是先手动执行一次垃圾回收，然后输出当前页面内存里还存在的 promise 对象。有 0 个，证明所有的 promise 对象都已经被回收了。 为了更明确的看到回收的确发生了，我们还可以给传入 test() 的 promise 对象和 test() 返回的 promise 对象都添加上垃圾回收的回调：   可以看到…",
        "excerpt_new": "前几年回答过一次这个问题，再重新回答一次。 想要知道 promise 对象有没有被回收掉，可以在控制台使用 queryObjects() ：   queryObjects(Promise) 做的是就是先手动执行一次垃圾回收，然后输出当前页面内存里还存在的 promise 对象。有 0 个，证明所有的 promise 对象都已经被回收了。 为了更明确的看到回收的确发生了，我们还可以给传入 test() 的 promise 对象和 test() 返回的 promise 对象都添加上垃圾回收的回调：   可以看到…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"nvG_397b\">前几年回答过一次这个问题，再重新回答一次。</p><p data-pid=\"WjY2PvVa\">想要知道 promise 对象有没有被回收掉，可以在控制台使用 queryObjects() ：</p><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-1ffcde01a2301b58d77ca52315be78aa_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"760\" data-rawheight=\"348\" data-original-token=\"v2-1ffcde01a2301b58d77ca52315be78aa\" data-default-watermark-src=\"https://pic4.zhimg.com/v2-390a6d16f6aa798a9e5a93add3012939_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"760\" data-original=\"https://pica.zhimg.com/v2-1ffcde01a2301b58d77ca52315be78aa_r.jpg\"/></figure><p data-pid=\"boS6yUzX\">queryObjects(Promise) 做的是就是先手动执行一次垃圾回收，然后输出当前页面内存里还存在的 promise 对象。有 0 个，证明所有的 promise 对象都已经被回收了。</p><p data-pid=\"2uKYjMrN\">为了更明确的看到回收的确发生了，我们还可以给传入 test() 的 promise 对象和 test() 返回的 promise 对象都添加上垃圾回收的回调：</p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-8164cf30bb165da50ba3de5d313b3d00_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"964\" data-rawheight=\"636\" data-original-token=\"v2-8164cf30bb165da50ba3de5d313b3d00\" data-default-watermark-src=\"https://pic1.zhimg.com/v2-be37145e9398638f6f40a79c6593e196_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"964\" data-original=\"https://pic1.zhimg.com/v2-8164cf30bb165da50ba3de5d313b3d00_r.jpg\"/></figure><p data-pid=\"UpeiFv1F\">可以看到，这两万个永远不会 resolve 的 promise 都被回收了，这也是符合预期的。</p><p data-pid=\"BBQZnf1M\">JS 标准应该没有制定垃圾回收的具体细节，任何的对象何时被回收，甚至完全不回收，可能都不算是违反规范，毕竟 test262 里没有相关测试。不过规范实际制定时肯定还是要考虑逻辑上不能存在内存泄漏的。</p><p data-pid=\"9Y0bpBUc\">所以这些都是引擎实现的知识，只有少数引擎开发能讲清楚这些细节，我只知道一点皮毛，下面是我的推测。</p><p data-pid=\"4iNdXAYR\">想要一个对象不被回收，必须有地方引用了它，除了直接引用，还可以间接的引用，比如：</p><div class=\"highlight\"><pre><code class=\"language-js\"><span class=\"k\">new</span> <span class=\"nb\">Promise</span><span class=\"p\">((</span><span class=\"nx\">resolve</span><span class=\"p\">,</span> <span class=\"nx\">reject</span><span class=\"p\">)</span> <span class=\"p\">=&gt;</span> <span class=\"p\">{</span> \n  <span class=\"nb\">window</span><span class=\"p\">.</span><span class=\"nx\">foo</span> <span class=\"o\">=</span> <span class=\"nx\">resolve</span> \n<span class=\"p\">})</span>\n</code></pre></div><p data-pid=\"DSP-aSjc\">因为全局变量 foo 引用了 resolve 函数，这个函数比较特殊，在 C++ 层面其实引用了它所属的 promise 对象，所以会导致 promise 对象一直可达（reachable），也就无法被垃圾回收。</p><div class=\"highlight\"><pre><code class=\"language-js\"><span class=\"k\">new</span> <span class=\"nb\">Promise</span><span class=\"p\">(</span><span class=\"nx\">resolve</span> <span class=\"p\">=&gt;</span> <span class=\"p\">{</span>\n  <span class=\"nx\">setTimeout</span><span class=\"p\">(</span><span class=\"nx\">resolve</span><span class=\"p\">,</span> <span class=\"mi\">10000</span><span class=\"p\">)</span>\n<span class=\"p\">})</span>\n</code></pre></div><p data-pid=\"UQ-u9vcB\">像这个 promise，在 10 秒后才会被垃圾回收，10 秒内全局的任务队列里有个定时器任务引用了它，定时器执行完销毁后，这个 promise 对象就变成不可达的，从而也就被回收了。</p><p data-pid=\"KwWrKUPF\">如果 resolve 和 reject 都没被引用，它就会被直接回收掉：</p><div class=\"highlight\"><pre><code class=\"language-js\"><span class=\"k\">new</span> <span class=\"nb\">Promise</span><span class=\"p\">(()</span> <span class=\"p\">=&gt;</span> <span class=\"p\">{})</span>\n</code></pre></div><p data-pid=\"WTHgSE61\">除非有其它引用，比如你示例里的 p：</p><div class=\"highlight\"><pre><code class=\"language-js\"><span class=\"nx\">async</span> <span class=\"kd\">function</span> <span class=\"nx\">test</span><span class=\"p\">(</span><span class=\"nx\">p</span><span class=\"p\">)</span> <span class=\"p\">{</span>\n  <span class=\"nx\">await</span> <span class=\"nx\">p</span>\n<span class=\"p\">}</span>\n\n<span class=\"nx\">test</span><span class=\"p\">(</span><span class=\"k\">new</span> <span class=\"nb\">Promise</span><span class=\"p\">(()</span> <span class=\"p\">=&gt;</span> <span class=\"p\">{}))</span>\n</code></pre></div><p data-pid=\"e9QuaA3n\">这个局部变量 p 的确引用了 promise 对象，那这个 promise 被回收只有一个可能，就是 p 也不在了，实际上的确是，这个 test 函数的执行上下文也被回收了，虽然它还没执行完。</p><p data-pid=\"bG-rUU0C\">实际上 V8 的 async function 在 parser 阶段是被 desugar 成 generator 的 <a href=\"https://link.zhihu.com/?target=https%3A//docs.google.com/document/d/1K38ct2dsxG_9OfmgErvFld4MPDC4Wkr8tPuqmSWu_3Y/edit\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">docs.google.com/documen</span><span class=\"invisible\">t/d/1K38ct2dsxG_9OfmgErvFld4MPDC4Wkr8tPuqmSWu_3Y/edit</span><span class=\"ellipsis\"></span></a>，所以 test 函数在实际执行时可能类似于：</p><div class=\"highlight\"><pre><code class=\"language-js\"><span class=\"kd\">function</span><span class=\"o\">*</span> <span class=\"nx\">test</span><span class=\"p\">(</span><span class=\"nx\">p</span><span class=\"p\">)</span> <span class=\"p\">{</span>\n  <span class=\"k\">yield</span> <span class=\"nx\">p</span>\n  <span class=\"nx\">console</span><span class=\"p\">.</span><span class=\"nx\">log</span><span class=\"p\">(</span><span class=\"nx\">p</span><span class=\"p\">)</span>\n<span class=\"p\">}</span>\n\n<span class=\"nx\">test</span><span class=\"p\">(</span><span class=\"k\">new</span> <span class=\"nb\">Promise</span><span class=\"p\">(()</span> <span class=\"p\">=&gt;</span> <span class=\"p\">{}))</span>\n</code></pre></div><p data-pid=\"qLu__fqU\">生成器在 yield p 这里停住，就类似于 await p 停住，因为已经没有办法引用到生成器的 next() 方法了，引擎就知道它不可能继续执行了，从而就一连串回收掉了所有的相关对象，具体的细节我是讲不清楚的。</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 73891,
        "favorite_count": 524,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3270699180}",
      "attached_info": "CrsFCLP1/9besZbOkAEQBBoJNjI0NzUwMzAwINyI/6kGKKIEMCBACkpBCixUU19TT1VSQ0VfVFdPVE9XRVJfU0hPUlRJTlRFUkVTVF9SRUNBTExfVEVYVBIBMBgAIAA6CnsicmF3IjoiIn1aCTEwMTc2MTI3N2IgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjMyNzA2OTkxODCKAQk2Mjc2NzA5MjSqAQlyZWNvbW1lbmTCASA0OWQ4ODdkOTY3MTg2MWYyMTQ3OWE2Y2RjY2E4MWQ1MfIBCggMEgZOb3JtYWzyASgIChIkZGRjZDRmMDQtZTE2Mi00MWQ4LWFlMGUtOGFmZWZkYWZlYzFm8gEFCAsSATKCAgCIApGe6ZiNMpICIDQ5ZDg4N2Q5NjcxODYxZjIxNDc5YTZjZGNjYTgxZDUxmgIAygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxl2gIsVFNfU09VUkNFX1RXT1RPV0VSX1NIT1JUSU5URVJFU1RfUkVDQUxMX1RFWFToAgX6AgtOT1JNQUxfRkxPV4oDIGJhMDIwNDcwMGZjNjQ4NDBiYjhmOTgyYTJhYmNmMjBlmgMNCgJ2MBAAGgVvdGhlcqgDo8EE2AMA6gMgZmVlZF9zaG9ydGludGVyZXN0X3R3b3Rvd2VyX3RleHT6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBNaAEAKgEALAEALoEBm1hbnVhbMIEAzE3MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAQIF1xz+BBQAAAAAAAAAAiQU3UBy+GS6dP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUCkAYAkgIlCgk2MjQ3NTAzMDASCjMyNzA2OTkxODAYBCIKSU1BR0VfVEVYVA==",
      "action_card": false
    }, {
      "id": "11_1721528635.595",
      "type": "feed",
      "offset": 11,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528635,
      "updated_time": 1721528635,
      "target": {
        "id": 3568534445,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3568534445",
        "author": {
          "id": "46c607f5a489ba42d49a436a05d8a049",
          "url": "https://api.zhihu.com/people/46c607f5a489ba42d49a436a05d8a049",
          "user_type": "people",
          "url_token": "qia-qia-bu-94",
          "name": "一只逍遥的鬼",
          "headline": "且视他人之疑目如盏盏鬼火，大胆地去走你的夜路~",
          "avatar_url": "https://pic1.zhimg.com/50/v2-cf0ea00b0bcb33e0009145d1d8a88526_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 0,
          "badge": [{
            "type": "identity_people",
            "description": "兰州大学 地质科学与矿产资源学院硕士在读"
          }],
          "followers_count": 237,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1721527372,
        "updated_time": 1721527372,
        "voteup_count": 0,
        "thanks_count": 0,
        "comment_count": 0,
        "is_copyable": true,
        "question": {
          "id": 661907636,
          "type": "question",
          "url": "https://api.zhihu.com/questions/661907636",
          "author": {
            "id": "39a1ddbc2baf40a1ef85a50d9e01dc5b",
            "url": "https://api.zhihu.com/people/39a1ddbc2baf40a1ef85a50d9e01dc5b",
            "user_type": "people",
            "url_token": "liang-zhi-84-31",
            "name": "惊蛰",
            "headline": "",
            "avatar_url": "https://pic1.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 0,
            "is_following": false,
            "is_followed": false
          },
          "title": "GIS研发，比如webgis开发，想问的是那种为政府部门写的一张图展示系统，做这个展示系统有产能吗？",
          "created": 1721264184,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 0,
          "bound_topic_ids": [613, 4412, 12941, 15556, 177508],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "一张图展示系统，现在应该已经不算是前沿了，随着国家部委的合并和更新，现在大家做的应该是叫国土空间规划系统。所谓一张图，本就是基于数据，所有的图源准确的话，这张图还是很有用的，但是现在不管国家层面，还是地方，这个东西推行起来阻力很大，很多都是面子工程。我不懂什么产能，但是觉得应该没什么实际的应用价值。 回到系统的设置初衷，一张图展示系统，首先是各种图层的展示，然后会有一些其他基础功能，比如对图斑的…",
        "excerpt_new": "一张图展示系统，现在应该已经不算是前沿了，随着国家部委的合并和更新，现在大家做的应该是叫国土空间规划系统。所谓一张图，本就是基于数据，所有的图源准确的话，这张图还是很有用的，但是现在不管国家层面，还是地方，这个东西推行起来阻力很大，很多都是面子工程。我不懂什么产能，但是觉得应该没什么实际的应用价值。 回到系统的设置初衷，一张图展示系统，首先是各种图层的展示，然后会有一些其他基础功能，比如对图斑的…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"Rz-55G1v\">一张图展示系统，现在应该已经不算是前沿了，随着国家部委的合并和更新，现在大家做的应该是叫国土空间规划系统。所谓一张图，本就是基于数据，所有的图源准确的话，这张图还是很有用的，但是现在不管国家层面，还是地方，这个东西推行起来阻力很大，很多都是面子工程。我不懂什么产能，但是觉得应该没什么实际的应用价值。</p><p data-pid=\"xA34RS5r\">回到系统的设置初衷，一张图展示系统，首先是各种图层的展示，然后会有一些其他基础功能，比如对图斑的统计台账，选址规划，以及图件更新等。设计之初，是希望汇集多个部门的数据，展示在一张图上，修改性质冲突的图斑，也对规划起辅助作用，最后对区域的所有数据做到心中有数。</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-03781834be9e79978df7e0e2c128c0ab_b.jpg\" data-size=\"normal\" data-rawwidth=\"900\" data-rawheight=\"600\" data-original-token=\"v2-8d26cd47fa74dfafad06f275b0c518ec\" data-default-watermark-src=\"https://pic4.zhimg.com/v2-d9903e1d0c2a2f6470950286fe5e85a5_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"900\" data-original=\"https://picx.zhimg.com/v2-03781834be9e79978df7e0e2c128c0ab_r.jpg\"/><figcaption>图片来自网络</figcaption></figure><p></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 1,
        "favorite_count": 0,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3568534445}",
      "attached_info": "CpAFCLP1/9besZbOkAEQBBoJNjc4ODk1NDk4IMzY8bQGKAAwAEALSiQKGVRTX1NPVVJDRV9XQVJNX1VQX05PUk1BTDESATAYACAAOgBKIgoXVFNfU09VUkNFX1dBUk1VUF9SVUNFTkUSATAYACAAOgBaCTEwOTM2ODQxNmIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjM1Njg1MzQ0NDWKAQk2NjE5MDc2MzaqAQlyZWNvbW1lbmTCASA0NmM2MDdmNWE0ODliYTQyZDQ5YTQzNmEwNWQ4YTA0OfIBCggMEgZOb3JtYWzyASgIChIkOTc0Nzc5OTUtYzJlYS00YTVmLTkwYTItMzU4M2FkMDQ2ODg48gEFCAsSATKCAgCIApGe6ZiNMpICIDQ2YzYwN2Y1YTQ4OWJhNDJkNDlhNDM2YTA1ZDhhMDQ5mgIAygIYQ29udGVudFdhcm1VcEJyZWFrSW5SdWxl2gIZVFNfU09VUkNFX1dBUk1fVVBfTk9STUFMMegCAvoCC05PUk1BTF9GTE9XigMgYmEwMjA0NzAwZmM2NDg0MGJiOGY5ODJhMmFiY2YyMGWaAw0KAnYwEAAaBW90aGVyqAMB2AMA6gMLdGV4dF9ydWNlbmX6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEAmFpwgQDNDAwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAABgvDGoP4EFAAAAAAAAAACJBTdQHL4ZLp0/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQKQBgCSAiUKCTY3ODg5NTQ5OBIKMzU2ODUzNDQ0NRgEIgpJTUFHRV9URVhU",
      "action_card": false
    }];
    const list2 = [{
      "id": "12_1721528651.969",
      "type": "feed",
      "offset": 12,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528651,
      "updated_time": 1721528651,
      "target": {
        "id": 3567866166,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3567866166",
        "author": {
          "id": "45f82f7bad37556499365740638d70d3",
          "url": "https://api.zhihu.com/people/45f82f7bad37556499365740638d70d3",
          "user_type": "people",
          "url_token": "61-15-31-76-22",
          "name": "围城生存法则",
          "headline": "大二辍学，卖过保险，干过销售摆过摊创过业，十年折腾，财富自由",
          "avatar_url": "https://pic1.zhimg.com/50/v2-301afd0da9ad1a8f993733f21aa5b774_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 16553,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1721456719,
        "updated_time": 1721456719,
        "voteup_count": 106,
        "thanks_count": 11,
        "comment_count": 15,
        "is_copyable": false,
        "question": {
          "id": 645928675,
          "type": "question",
          "url": "https://api.zhihu.com/questions/645928675",
          "author": {
            "id": "ccf4b81af79909d448f34f31a40642e0",
            "url": "https://api.zhihu.com/people/ccf4b81af79909d448f34f31a40642e0",
            "user_type": "people",
            "url_token": "6132048417-5",
            "name": "还要加油",
            "headline": "",
            "avatar_url": "https://picx.zhimg.com/50/v2-c35b8921ec9eba492e54a6d55dd36bcf_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 0,
            "followers_count": 0,
            "is_following": false,
            "is_followed": false
          },
          "title": "为什么现在的00后好像什么都看透了？",
          "created": 1708935329,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 17,
          "bound_topic_ids": [3455, 15317, 26930, 152128, 185213],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "1、我被一个00后的话震惊了， 他说我吃不了学习的苦，也吃不了生活的苦，可我为什么要吃苦呢？ 我活在这个世界上就是为了吃苦吗？ 为什么老教育我们吃苦？ 吃苦就一定能成功吗？ 可是很多人吃了很多苦也没有成功，那被教育吃苦的又有什么意义呢？ 如果吃了十分的苦能获得十分的报酬，那没关系，我可以吃苦，但是如果吃了苦还得不到香烟的报酬，那我还不如不吃苦。 我觉得这话十分有道理，你觉得呢？ 之前有一位网红在网上发布了…",
        "excerpt_new": "1、我被一个00后的话震惊了， 他说我吃不了学习的苦，也吃不了生活的苦，可我为什么要吃苦呢？ 我活在这个世界上就是为了吃苦吗？ 为什么老教育我们吃苦？ 吃苦就一定能成功吗？ 可是很多人吃了很多苦也没有成功，那被教育吃苦的又有什么意义呢？ 如果吃了十分的苦能获得十分的报酬，那没关系，我可以吃苦，但是如果吃了苦还得不到香烟的报酬，那我还不如不吃苦。 我觉得这话十分有道理，你觉得呢？ 之前有一位网红在网上发布了…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "disallowed",
        "content": "<p data-pid=\"xEQT8A-q\">1、我被一个00后的话震惊了，</p><p data-pid=\"6wJ66iCE\">他说我吃不了学习的苦，也吃不了生活的苦，可我为什么要吃苦呢？</p><p data-pid=\"XbXCqsX5\">我活在这个世界上就是为了吃苦吗？</p><p data-pid=\"OSImO2Pp\">为什么老教育我们吃苦？</p><p data-pid=\"pLD428um\">吃苦就一定能成功吗？</p><p data-pid=\"4NNI7Dh7\">可是很多人吃了很多苦也没有成功，那被教育吃苦的又有什么意义呢？</p><p data-pid=\"f_nttAbw\">如果吃了十分的苦能获得十分的报酬，那没关系，我可以吃苦，但是如果吃了苦还得不到香烟的报酬，那我还不如不吃苦。</p><p data-pid=\"Lksq73jW\">我觉得这话十分有道理，你觉得呢？</p><p data-pid=\"MbenbVOM\">之前有一位网红在网上发布了一条呼吁保护北极熊的视频，他说，北极熊的落脚点越来越少了，但他游不动了，就再也没有北极熊了。</p><p data-pid=\"9iAGNODA\">那一开始听到这话，心里都会产生了一种罪恶感，但是看到一位网友的评论，就突然间悟了。 这位网友说，房价高涨，貌似我也变成了漂泊的北极熊，没有落脚之处，买不起房，买不起车，不舍得开空调的我，却需要承担全球变暖的责任。</p><p data-pid=\"kxE2H9XB\">海边一次没有去过，海岸的垃圾却成了我的错。小时候提倡不吃鱼翅，可是唯一一次见过鱼翅啊，也是在电视广告里。</p><p data-pid=\"_vAjmUlY\">那究竟是谁让北极熊流浪，又是谁让我无处落脚呢？</p><p data-pid=\"_SetiZBU\">我只是平凡的生活在我的一亩三分地，那为什么罪恶却要我来平摊？</p><p data-pid=\"_QfQT8Zw\">3%的全球富豪消耗了65%的资源，就呼吁97%的普通人节约资源，</p><p data-pid=\"xOzMHCvp\">那最后节省呢？给富豪们使用？</p><p data-pid=\"-13E3Z0S\">那有网友说啊，我节约了20年的水都没有他们一次高尔夫草坪保养用的水多，</p><p data-pid=\"FU89ryWy\">那当我知道<span class=\"nolink\">卡戴珊</span>家的水龙头从来不关的时候啊，节约用水跟我就已经没有半毛钱关系了啊，这叫什么？</p><p data-pid=\"KblcL0_4\">这叫富贵不能共享，罪恶啊，却要平摊。</p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"AEcdwBPO\">2、近日，一位混迹体制多年的教授，发现一个奇怪的现象，<b>体制内努力的大多是官二代和富二代，越是寒门子弟工作上越不怎么积极。</b>这完全颠覆了大家传统中的印象。</p><p data-pid=\"hOUCsj2m\">以前我们都觉得那些官富二代肯定趾高气扬、目中无人，工作上敷衍了事，谁也指挥不动。而农二代们肯定兢兢业业、踏实肯干。</p><p data-pid=\"P8gunPJs\"><b>然而，事实却恰恰相反。</b></p><p data-pid=\"UW4yP4E_\">很多朋友反映他们单位也是这样。越是家里有钱、有背景的，干起工作来越起劲。每天开会、整材料，听讲座、参加培训、填各种表…乐此不疲。</p><p data-pid=\"pXoVOUEV\">越是农村出身的工作越消极、喜欢抱怨，开会培训能躲就躲，好多都进入<a href=\"https://www.zhihu.com/search?q=%E8%81%8C%E4%B8%9A%E5%80%A6%E6%80%A0%E6%9C%9F&amp;search_source=Entity&amp;hybrid_search_source=Entity&amp;hybrid_search_extra=%7B:,:3420477627%7D\" class=\"internal\">职业倦怠期</a>了。</p><p data-pid=\"wJ3XQJMX\">为什么会这样呢？我想大概有这么几个理由。 <b>体制内的农二代们从小都经历过苦日子，家庭负担重。</b></p><p data-pid=\"c0_0qicF\">贫穷基因深入骨髓，对他们的生活和工作影响巨大，没有钱就缺乏安全感，而且他们还背负着车贷、房贷等。</p><p data-pid=\"t8evttHC\"><b>因此他们对金钱看的比较重，渴望多赚钱来改变个人境遇和家庭条件。</b></p><p data-pid=\"YHq6MYMs\">但体制内的工作大多是形式主义的。</p><p data-pid=\"sxwTgAe2\">拼命的写材料、拼命的开会，不仅收获不到成就感，也无法体现在工资待遇上，就像一拳打在棉花上一样。</p><p data-pid=\"QQpXQ1lr\">久而久之，农二代们就有点心灰意冷、得过且过。尤其对一些走形式的工作特别排斥和抵触。 体制内的富二代们出身官商之家，家境殷实，对金钱没有多高的欲望。</p><p data-pid=\"hU-AQbc7\">车房都是父母早就置办好的，有的家里甚至给买了多套房、多辆车。他们每个月工资都用在吃喝玩乐上，父母还经常补贴他们。</p><p data-pid=\"2L7FUscE\"><b>因此他们没有挣钱的焦虑感和迫切感，工作起来从容不迫、快快乐乐。</b>和农二代们形成鲜明对比。 农二代们能够一路披荆斩棘考进体制，得益于相对公平的高考制度和公务员考试制度。</p><p data-pid=\"S9m5TXEj\">因此，<b>在骨子里他们对公平看的很重。</b>人人都笑<span class=\"nolink\">范进</span>，人人却又抢着当范进。</p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"UBjLHDTM\">3、最近在知乎看到一个博主的视频采访，他在国内各个高档小区的车库里采访开超跑的车主。</p><p data-pid=\"ikNq3qK5\">采访来采访去，他发现了一个非常有意思的事情，就是这些车主，特别是开<span class=\"nolink\">法拉利</span>或者兰博基尼的，大多是年轻人，这不奇怪，奇怪的是啥呢？</p><p data-pid=\"cUo1lS7f\"><b>奇怪的是他们白天开大众丰田，晚上和周末才开这些超跑出门潇洒泡妞</b></p><p data-pid=\"s48u9F7z\"><b>一采访才知道，他们大多数都是在体制内工作，央企和<span class=\"nolink\">国有企业</span>居多。性格都很好很低调。</b></p><p data-pid=\"MKCVanm3\">问他们问题，他们会告诉你这些车是家里父母买的，自己在大城市一个月五千多到一万块也能过的非常好。</p><p data-pid=\"fVY2EdD6\">你必须要承认的是，目前的国内就是最适合富二代生活的地方，只要不乱讲话不<span class=\"nolink\">炫富</span>，不该碰的东西不碰，就比任何地方都舒服。大学和硕士在国外读的，该玩玩了，该花花了，该见的见了，回家收个心，找个门当户对，或者为了保证基因优良找个高颜值高学历繁衍后代，<b>这就是他们舒服而又简简单单的一生。</b></p><p data-pid=\"gh9SYSC5\">而我们，很多情况下，我们持续不断地努力，艰辛的生活也只是让我们保持一种只能只称之为平庸的生活而已。</p><p data-pid=\"t64q-P2U\">钱都流向了不缺钱的人，爱都给了不缺爱的人，所以苦也就都留给了能吃苦的人。</p><p data-pid=\"YTNw0O1N\"><b>90%勤奋努力的人养活了10%不劳而获的人。而这90%的人存在的目的，就是为了帮助另外10%的人活得更好。然后这10％的人绞尽脑汁，不断的去设计各种规则来限制、控制90%的人。</b></p><p data-pid=\"ggMl73fS\">富人的财富都来自于穷人的劳动，穷人越努力，富人就越富有，这才是所谓的<span class=\"nolink\">勤劳致富</span>。</p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"Go3Nr_Jv\">4、我们去公司上班，老板和领导会告诉我们，我们在这儿踏踏实实干十年，就会有房有车；我们在家里种地，干部告诉我们，只要勤劳就是致富，村里的某某不就是天天窝在家里种地，一年赚五六万嘛？！但是他不会告诉我们，谁谁出去打工，一年赚了十来万。我们的老板更不会告诉我们，谁谁辞职了，然后在<span class=\"nolink\">深圳</span>或珠海折腾，一年搞几百万！</p><p data-pid=\"izMkBEg7\"><b>上面制定规则，然后鼓励下面适应规则，结果导致穷人越来越穷，让有志于成功的人，变得更加傻逼。</b></p><p data-pid=\"ZB9lXEyS\">现在我们也看到了，没有一个老百姓或者打工仔，因为听领导或老板的话而一年赚了几百万。</p><p data-pid=\"q8bYBupo\">这个世界需要大量的穷人，所以有人故意让你一直穷下去，最好世世代代的穷下去。</p><p data-pid=\"hSgFW2vc\">只有那些真正领悟了制定规则者的核心秘密的兄台，才能笑到了最后！</p><p data-pid=\"elhPo9U8\"><b><span class=\"nolink\">利益</span>的最大获得者，往往是不守规矩和利用规矩的人，等他们的利益到手之后，又开始制定规矩，让大家去遵守，以保证自己的利益。</b></p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"keOVs6eE\">5、我打工的时候换过好几家工厂（公司），每换一个，就有人给我们讲，在咱们这里，只要好好的干，不出五年，工资就能翻番，买车买房都不是问题，可是当我与老工人聊天时，发现他们既没有买车也没有有买房，问工资，说是好几年了，才涨了不到2000块，我问他咋不换个地方，他叹了口气说，到哪里还不都一样？ 我辛辛苦苦干了好几年才涨了2000工资，走了不就都没了嘛？。。。</p><p data-pid=\"BbfYthqC\">老板还说，谁谁不好好的干，自己创业去了，结果赔了几十万，差点想不开跳楼！</p><p data-pid=\"t4kuxm-N\">后来我离开工厂跃入江湖折腾，多的是人冷眼旁观，多的是人笑我痴傻，只是过了N年，我不但没跳楼，还混的比他们好。</p><p data-pid=\"SiPIU1sl\"><b>穷人想混出来太难了，当你辛辛苦苦工作了几年，有了一点点积蓄，又设计出<span class=\"nolink\">房贷</span>车贷，把你未来的几十年都掏空</b>。你通过<span class=\"nolink\">车贷</span>房贷获得了车子，房子，你得意洋洋，却不知道你陷入了一个圈套。然后你就得每天早出晚归，忙到停不下来，你根本没有时间思考其他的东西。让你余生都只能是为了糊口，不能停下，且无翻身之日。</p><p data-pid=\"DbdA4hCp\"><b>我们大多数年轻人其实根本无力反抗这个社会，因为我们的原生家庭并不是很有钱，父母含辛茹苦供我们<span class=\"nolink\">读书</span>，而我们也不负众望，从小地方走到大城市，可<span class=\"nolink\">周劼</span>却说：</b></p><p data-pid=\"Yt3IQFRI\"><b>高中同学不少去外省读了好大学的，都回家进了烟草、电网之类的，回家没有着落的，才去北上广深<span class=\"nolink\">成都</span></b></p><p data-pid=\"3URHWn9V\">一语道破天机，家里有后门的，父母早就安排好了，家里没背景的，才在大城市自己打拼。</p><p data-pid=\"lJf6BZWV\">以前有个高中同学学渣，考了个<span class=\"nolink\">九江医专</span>，结果最近当了医院副院长，为什么呢，因为他爸以前是正院长，后来退休了，他就一步步顶上去了，记得看到<span class=\"nolink\">公示</span>的时候，我都意外极了。</p><p data-pid=\"kGfoqvXd\">还有个侄女的同桌，他爸是我们长沙某区<span class=\"nolink\">银行信贷</span>主任，上高中时就是上万的自行车，七千多的外套，他妈一次给他买两件换着穿，课桌里的耳机最便宜一条一千四。我侄女给我说这些的时候，我蛋都惊呆了，信贷主任的儿子都这样，行长的儿子不得上天。</p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"-hszWQBX\"><b>反正收藏了你也不看，点个赞意思意思得了呗~~</b></p><a href=\"https://zhuanlan.zhihu.com/p/695600042\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">围城生存法则：你知道哪些让你毁三观的事？</a><a href=\"https://www.zhihu.com/question/20308010/answer/3456555929\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">什么叫洗钱？</a><p data-pid=\"46Vd_27K\"><b>喜研究生活中的<span class=\"nolink\">人情世故</span>、送礼绝学和社会潜规则。累计为3000+人解答过人际、送礼、职场等难题。私人号：LSLS228228。添加即送：《<span class=\"nolink\">职场升迁秘籍</span>+送礼绝学》《<span class=\"nolink\">人性天书</span><span class=\"nolink\">72卷</span>》</b></p><p data-pid=\"QPgJPhXc\"><b>欢迎大家关注我的公号</b>【<b>围城生存法则</b>】<b>，关注我，学会为人处事，看透<span class=\"nolink\">人情世故</span>，提前三十年改变<span class=\"nolink\">命运</span>。点赞和关注</b> <a href=\"https://www.zhihu.com/people/45f82f7bad37556499365740638d70d3\" class=\"internal\">@围城生存法则</a><b>让你今年暴富 ~</b></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 14112,
        "favorite_count": 100,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3567866166}",
      "attached_info": "CtsFCJ7qm4COqI6nmwEQBBoJNjc4Nzc0MTc2IM+w7bQGKGowD0AMSk8KHFRTX1NPVVJDRV9IT1RfQ1JPU1NfUkVBTFRJTUUSKWhvdF9yZWNhbGxfcmVhbHRpbWVfdDpub3JtYWw6MjAyNC0wNy0yMTo4GAAgADoASigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9WgkxMDU4MTc0MjFiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgozNTY3ODY2MTY2igEJNjQ1OTI4Njc1qgEJcmVjb21tZW5kwgEgNDVmODJmN2JhZDM3NTU2NDk5MzY1NzQwNjM4ZDcwZDPyAQoIDBIGTm9ybWFs8gEoCAoSJGVkNmQyOGRkLWE4M2MtNGFmMi05ODBmLTEwNDY1MDkxODRiMPIBBQgLEgEzggIAiALjoOqYjTKSAiA0NWY4MmY3YmFkMzc1NTY0OTkzNjU3NDA2MzhkNzBkM5oCAMoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhxUU19TT1VSQ0VfSE9UX0NST1NTX1JFQUxUSU1F6AIC+gILTk9STUFMX0ZMT1eKAyBjNjc2OWJiNGE1ZDA0MjA3YjExYjJhNmJkZWQ5M2EzYpoDDQoCdjAQABoFb3RoZXKoA6Bu2AMA6gMfaG90Q3Jvc3NSZWFsVGltZUNvbnRlbnRSZWNhbGxlcvoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTcwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAABAVWa/P4EFAAAAAAAAAACJBfn1/Hxpn6Q/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQOQBgCSAiUKCTY3ODc3NDE3NhIKMzU2Nzg2NjE2NhgEIgpJTUFHRV9URVhU",
      "action_card": false
    }, {
      "id": "13_1721528651.245",
      "type": "feed",
      "offset": 13,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528651,
      "updated_time": 1721528651,
      "target": {
        "id": 3198303243,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3198303243",
        "author": {
          "id": "a5de66a48ca9514b6e5732b8d01e775e",
          "url": "https://api.zhihu.com/people/a5de66a48ca9514b6e5732b8d01e775e",
          "user_type": "people",
          "url_token": "xiao-ming-73-83-23",
          "name": "小明",
          "headline": "搬砖的",
          "avatar_url": "https://pic1.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          "is_org": false,
          "gender": -1,
          "followers_count": 2751,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1693907233,
        "updated_time": 1693907233,
        "voteup_count": 29968,
        "thanks_count": 4126,
        "comment_count": 1671,
        "is_copyable": true,
        "question": {
          "id": 350577228,
          "type": "question",
          "url": "https://api.zhihu.com/questions/350577228",
          "author": {
            "id": "d17491360059c1c474ae90e28f38518f",
            "url": "https://api.zhihu.com/people/d17491360059c1c474ae90e28f38518f",
            "user_type": "people",
            "url_token": "gei-ji-mo-yi-zhi-yan",
            "name": "给寂寞一支烟",
            "headline": "工作虐我千百遍我爱工作如初恋的戒毒工作者",
            "avatar_url": "https://picx.zhimg.com/50/v2-3552d5c89b54d8f786c4b33fc5671206_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 49,
            "is_following": false,
            "is_followed": false
          },
          "title": "你们听过领导最没水平的一句话是什么？",
          "created": 1570981536,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 65,
          "bound_topic_ids": [2566, 2738, 37593, 224553, 1358076],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "不用一句话，一个字就能体现出来。 就今天，就刚刚。",
        "excerpt_new": "不用一句话，一个字就能体现出来。 就今天，就刚刚。",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"CpSxxBcY\">不用一句话，一个字就能体现出来。</p><p data-pid=\"AltEOdRe\">就今天，就刚刚。</p><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-4b523cfb2f07d787abe19526e9ede02e_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"477\" data-rawheight=\"172\" data-original-token=\"v2-0efb6a245a67f8415ea91c92c1e70eeb\" data-default-watermark-src=\"https://picx.zhimg.com/v2-0d679790306d501d9da5ef48de49dadb_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"477\" data-original=\"https://pica.zhimg.com/v2-4b523cfb2f07d787abe19526e9ede02e_r.jpg\"/></figure><p></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": true,
        "visited_count": 6006291,
        "favorite_count": 1618,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3198303243}",
      "attached_info": "Co0FCJ7qm4COqI6nmwEQBBoJNjExNTkxNTgyIKHy26cGKJDqATCHDUANSigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9Wgg0MDE4NDIwNmIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjMxOTgzMDMyNDOKAQkzNTA1NzcyMjiqAQlyZWNvbW1lbmTCASBhNWRlNjZhNDhjYTk1MTRiNmU1NzMyYjhkMDFlNzc1ZfIBCggMEgZOb3JtYWzyASgIChIkNDQ1YTQ0ZjYtODAxNy00ODA4LWE0YTYtNzFlMDg1MjVjOGQ08gEFCAsSATOCAgCIAuOg6piNMpICIGE1ZGU2NmE0OGNhOTUxNGI2ZTU3MzJiOGQwMWU3NzVlmgIAygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxlygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCE1RTX1NPVVJDRV9GRUVEUkVfVjjoAgL6AgtOT1JNQUxfRkxPV4oDIGM2NzY5YmI0YTVkMDQyMDdiMTFiMmE2YmRlZDkzYTNimgMNCgJ2MBAAGgVvdGhlcqgDk8zuAtgDAOoDCWZlZWRyZV92OPoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAADg90TDP4EFAAAAAAAAAACJBfn1/Hxpn6Q/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQOQBgCSAiUKCTYxMTU5MTU4MhIKMzE5ODMwMzI0MxgEIgpJTUFHRV9URVhU",
      "action_card": false
    }, {
      "id": "14_1721528651.952",
      "type": "feed",
      "offset": 14,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528651,
      "updated_time": 1721528651,
      "target": {
        "id": 3331628116,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3331628116",
        "author": {
          "id": "a0265e93117d3d366adda36310194727",
          "url": "https://api.zhihu.com/people/a0265e93117d3d366adda36310194727",
          "user_type": "people",
          "url_token": "jzwa",
          "name": "平凡",
          "headline": "AI｜留学｜语言｜合作V + pingfan-uk",
          "avatar_url": "https://pic1.zhimg.com/50/v2-9f81432bb5f397e14ec2c65e949eb0d3_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "badge": [{
            "type": "identity_people",
            "description": "Coventry Univesrity Lecturer"
          }, {
            "type": "best_answerer",
            "description": "英语等 3 个话题下的优秀答主",
            "topic_names": ["英语", "编程", "AIGC"],
            "topic_ids": [1100, 1354, 2236786]
          }],
          "followers_count": 128716,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1702993557,
        "updated_time": 1708959337,
        "voteup_count": 40632,
        "thanks_count": 10993,
        "comment_count": 575,
        "is_copyable": false,
        "question": {
          "id": 598243591,
          "type": "question",
          "url": "https://api.zhihu.com/questions/598243591",
          "author": {
            "id": "352385490b477ab999f64fae99d570ca",
            "url": "https://api.zhihu.com/people/352385490b477ab999f64fae99d570ca",
            "user_type": "people",
            "url_token": "zlp520",
            "name": "白川",
            "headline": "不近视不长胖不长痘的90后",
            "avatar_url": "https://picx.zhimg.com/50/v2-c951f7e4657d0018f2832a42301d7ee1_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 0,
            "is_following": false,
            "is_followed": false
          },
          "title": "能大致讲一下ChatGPT的原理吗？",
          "created": 1682663374,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 13,
          "bound_topic_ids": [99, 42302, 124944, 88287, 180476],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "国外有个博主写了一篇博文，名字叫「ChatGPT： Explained to Kids」，直译过来就是，给小孩子解释什么是ChatGPT。   因为现实是很多的小孩子已经可以用父母的手机版ChatGPT玩了，ChatGPT几乎可以算得上无所不知，起码给小孩子讲故事，回答一些简单的回答不在话下。 其实这里面就涉及到ChatGPT的一个最最基本也是核心的功能，就是问答，而这个问答功能就是第一代ChatGPT主要的功能。 第一代ChatGPT非常的简单直接，你打字给它，它输…",
        "excerpt_new": "国外有个博主写了一篇博文，名字叫「ChatGPT： Explained to Kids」，直译过来就是，给小孩子解释什么是ChatGPT。   因为现实是很多的小孩子已经可以用父母的手机版ChatGPT玩了，ChatGPT几乎可以算得上无所不知，起码给小孩子讲故事，回答一些简单的回答不在话下。 其实这里面就涉及到ChatGPT的一个最最基本也是核心的功能，就是问答，而这个问答功能就是第一代ChatGPT主要的功能。 第一代ChatGPT非常的简单直接，你打字给它，它输…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "need_payment",
        "content": "<p data-pid=\"R47xvNyF\">国外有个博主写了一篇博文，名字叫「ChatGPT： Explained to Kids」，直译过来就是，给小孩子解释什么是ChatGPT。</p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-b4d1e551680faa5370f4e1388b56b6cd_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"586\" data-rawheight=\"718\" data-original-token=\"v2-f6c33a68a1647f064abb19fc74da35f9\" data-default-watermark-src=\"https://picx.zhimg.com/v2-b3d41e12ba57161d31ad9603f7c1dbf1_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"586\" data-original=\"https://pic4.zhimg.com/v2-b4d1e551680faa5370f4e1388b56b6cd_r.jpg\"/></figure><p data-pid=\"UOTA2rGk\">因为现实是很多的小孩子已经可以用父母的手机版ChatGPT玩了，ChatGPT几乎可以算得上无所不知，起码给小孩子讲故事，回答一些简单的回答不在话下。</p><p data-pid=\"GV6uoMHe\">其实这里面就涉及到ChatGPT的一个最最基本也是核心的功能，就是问答，而这个问答功能就是第一代ChatGPT主要的功能。</p><p data-pid=\"Ndh27QB8\">第一代ChatGPT非常的简单直接，你打字给它，它输出给你。</p><p data-pid=\"S_hG2CpY\">比如你输入你好，它会随机的给出「吗」，「高」，「美」等回答，这些回答选项取决于你们之前的对话内容。</p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-1642ae6d34c96866152a714448429805_b.jpg\" data-size=\"normal\" data-rawwidth=\"468\" data-rawheight=\"150\" data-original-token=\"v2-c53853fc637b4b18e363cfbcad173352\" data-default-watermark-src=\"https://pic1.zhimg.com/v2-184b7843a696ebf73039bee3e2d0f04e_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"468\" data-original=\"https://pic4.zhimg.com/v2-1642ae6d34c96866152a714448429805_r.jpg\"/><figcaption>李宏毅教授PPT</figcaption></figure><p data-pid=\"Bop3sCqc\">这个阶段的ChatGPT是大语言模型，它的特点就是只能接受文字输入，并且也只能以文字输入。</p><p data-pid=\"S6lCiEd8\">中文，英文，数字或者是代码，其本质上都是文字，那么其实最主要的问题就是为什么ChatGPT能理解我们说的话，同时还能基本上回答出让我们满意甚至是惊艳的回答。</p><p data-pid=\"5FVDxbmO\">我们其实可以用一句老话来形容，那就是书读百遍，其义自现。</p><p data-pid=\"1sOTYfOB\">说白了就是读的多了，就算不懂某句古诗或者古文的意思，但是起码是背下来了，直接背出来了。</p><p data-pid=\"S3OQdF3X\">ChatGPT就是读了巨量的「书」，这些资料有的来自于书籍，有的来自于互联网，总之它读了很多很多的书，它的记忆里存储了大量的知识，这一点儿跟人类其实非常的像。</p><p data-pid=\"wk7xb4Xi\">但是在回答的问题跟人类会有一些不同，比如我们在背诵古诗词的时候，床前明月光，后面如果我们背下来了并且确定背的对的话，后一句肯定接的是疑是地上霜。当然我们可以随便编一个错误回答，比如唧唧复唧唧，我们是回答了，但是我们知道肯定是瞎编的。</p><p data-pid=\"ocbvX2D7\">但是ChatGPT在回答的时候不是这么思考的，它的学习资料来自于公开的数据，如果所有的资料里面床前明月光后面都是疑是地上霜，那么你放心，它肯定可以回答的又快又对。</p><p data-pid=\"WIPh7L93\">不过事实上，互联网上的资料不一定都对，有可能某一篇或者某几篇文章里面它的诗句就是错的，那么ChatGPT就有一定的几率输出错误的回答。</p><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-cfa5993f3d0e2e376c55d8600e2b0e39_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"812\" data-rawheight=\"230\" data-original-token=\"v2-eecb17133016186cb4cac05a4f558c29\" data-default-watermark-src=\"https://pic4.zhimg.com/v2-cd9a1c57695688f3bf83ae4dcd715ddd_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"812\" data-original=\"https://pic2.zhimg.com/v2-cfa5993f3d0e2e376c55d8600e2b0e39_r.jpg\"/></figure><p data-pid=\"4eQmNAz7\">特别是很多人都体验过，ChatGPT会胡乱的说作者名字。</p><p data-pid=\"U2jta8_E\">因为ChatGPT的输出主要是靠概率，下一个字的输出取决于前面的内容，就还拿刚开始的问题来举例。</p><p data-pid=\"CKW3TcpL\">这也是我为什么一直强调现在学习AI的重要性，因为你如果对它了解不深的话，AI的很多潜力很难挖掘出来，了解它的最好方式就是了解它的底层原理，GPT就是一个非常好的切入点，我非常建议每个人都去听听由<a href=\"https://www.zhihu.com/search?q=%E7%9F%A5%E4%B9%8E%E7%9F%A5%E5%AD%A6%E5%A0%82&amp;search_source=Entity&amp;hybrid_search_source=Entity&amp;hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3200309548%7D#ud430j\" class=\"internal\">知乎知学堂</a>开设的这门人工智能入门课，其中也涉及到GPT的底层原理和应用技巧，非常的实用。</p><a data-draft-node=\"block\" data-draft-type=\"edu-card\" data-edu-card-id=\"1720560250325716992\"></a><p data-pid=\"QRDDNhMh\">课程邀请了2名圈内AI技术大牛讲课，趁着现在还免费，建议IT人都去看看，语言不限，如果了解Python 收获会更大！</p><p data-pid=\"VtXNAZ-W\">就比如你好，后面可以跟很多的词。</p><p data-pid=\"1t0ZvVY6\">如果你看到一个人好像受伤了，坐在地上，你应该会说：你好吗？</p><p data-pid=\"CJmqT3MT\">如果你在篮球场碰到了一个身高2米以上的运动员，你应该不会说你好吗或者你好美，而是你好高。</p><p data-pid=\"8slxYuFl\">你好美也同理。</p><p data-pid=\"lBnlkmVq\">我们就可以这么理解，ChatGPT是一个可以综合各种信息进行概率最大化输出的人工智能模型。</p><p data-pid=\"Zsk0lwZP\">这个时候我们可以讲一些细节。</p><p data-pid=\"7jvZrp07\">ChatGPT的名字分为两部分：Chat和GPT。</p><p data-pid=\"6V28eVrG\">Chat是聊天的意思，GPT是Gene rative Pre-trained Transformer的首字母缩写。</p><p data-pid=\"5LseJfj2\">其中Genrative是生成的意思，它的作用是可以创造或者生产一些新的东西；Pre-trained是它从大量的文本资料中学习而来，Transformer指的是一种人工智能的模型。</p><p data-pid=\"_M1C_-_l\">T不用关注，主要就看G和P这两个词就行。</p><p data-pid=\"2-3xbaEN\">我们主要用的就是它的Generative功能，用它来生成各种各样的内容；但是我们需要知道为什么它可以生产各种内容，原因就在于P。</p><p data-pid=\"5T-2pfGX\">只有学习了大量的内容，才可以进行再生产。</p><p data-pid=\"Wl1XBHmr\">而这种学习其实是会有局限性了，很自然的，比如说你从小学习了很多的知识，但你可以保证你对一个问题的回答是完全正确的吗？</p><p data-pid=\"R8nNA4hr\">几乎不可能，第一是知识的局限性，ChatGPT也一样，不可能掌握所有的知识；第二是知识的准确性，怎么保证所有的知识都是准确无误的；第三是知识的复杂性，同一个概念在不同的语境下有不同的体现，这种度别说AI，就连人都很难完美把握。</p><p data-pid=\"cife5bee\">所以我们在使用ChatGPT的时候，也需要监督ChatGPT输出内容的准确性，它大概率是没问题的，但是你要把它用在关键问题上，就得人工再审核一遍。</p><p data-pid=\"eRbaNuA9\">而现在的ChatGPT，其实已经升级过两次了，一次是GPT4，具有更准确的回答能力，另一次是最近的GPT Turbo。</p><p data-pid=\"0PYiy1jV\">现在的ChatGPT，是一种叫多模态的大模型，它跟第一代不同的地方就在于它不仅可以接收和输出文字，也可以接收其他类型的输入，比如图片，文档，视频等等，然后输出也更加多样化，除了文本之外，也可以输出图片或者文件等等。</p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-46ccd40b9c99d4f4dbdf0c1e674389b8_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"468\" data-rawheight=\"422\" data-original-token=\"v2-fd3d1a77b3fa9edd0f58cd075c0d935d\" data-default-watermark-src=\"https://pic2.zhimg.com/v2-7031365fe0ed3283192452cb3fda811b_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"468\" data-original=\"https://pic1.zhimg.com/v2-46ccd40b9c99d4f4dbdf0c1e674389b8_r.jpg\"/></figure><p data-pid=\"m-RoAaaZ\">这个「模」在这里就指的是不同的数据类型，为什么ChatGPT要做多模态，本质上就是因为OpenAI做ChatGPT的初衷就是要做AGI。</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-0ebfdcb616962ca3217591e91efde815_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"468\" data-rawheight=\"306\" data-original-token=\"v2-a395ec858fc53f66d9bbfba986a0542f\" data-default-watermark-src=\"https://pic2.zhimg.com/v2-5b69cf1eb6a2e3441900702a605dc075_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"468\" data-original=\"https://picx.zhimg.com/v2-0ebfdcb616962ca3217591e91efde815_r.jpg\"/></figure><p data-pid=\"NJKfAMPp\">而AGI又是什么呢，它的全名叫Artificial general intelligence，通用人工智能。</p><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-9001430465a6f3507b3d772942450410_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"468\" data-rawheight=\"240\" data-original-token=\"v2-87d1168352b240bb8589e494585def30\" data-default-watermark-src=\"https://pic4.zhimg.com/v2-b21bba0205bb805251f69518b0c7dac9_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"468\" data-original=\"https://pica.zhimg.com/v2-9001430465a6f3507b3d772942450410_r.jpg\"/></figure><p data-pid=\"esSY2Kwm\">它的特点就是可以在所有的任务中表现的跟人类相似。</p><p data-pid=\"xwjU-Ovj\">也可以简单的理解为跟人类具有相近的智能程度，而像人类的话，起码可以跟人类一样做到几件事，可以看东西，可以听东西，可以说东西，也可以写东西。</p><p data-pid=\"yY8YSOKm\">第一代的ChatGPT只能看文字和写文字，其实远远摸不到AGI的边。</p><p data-pid=\"_B1e75tu\">而多模态就是必要的实现路径，现在的ChatGPT可以看，看文字和看图片都可以；可以听和说，这个功能已经在手机APP版本的ChatGPT中实现了，也可以写，也就是输出东西，它可以写代码，写文章，也可以画画等等。</p><p data-pid=\"TGIAehFv\">这就是为什么要做多模态的出发点，更重要的是这个世界本来就是多模态的，很多东西很难用文字完全表述，比如如何形容一朵花都感觉不够完美，最简单方法就是把照片拿出来看。</p><p data-pid=\"uiFVe68Y\">而多模态的ChatGPT就做的事这件事，接收各种类型的输入并且输出各种类型的输出。</p><p data-pid=\"ZyvHPZbP\">这篇问答主要的作用是通俗的解释了ChatGPT的运行原理，但是很多的细节并没有涉及到，如果大家对于细节感兴趣，建议大家可以去看看知学堂开设的AGI课程，里面还有一些深入浅出的技术细节讲解。</p><a data-draft-node=\"block\" data-draft-type=\"edu-card\" data-edu-card-id=\"1720560323046850560\"></a><p></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 8642588,
        "favorite_count": 73190,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3331628116}",
      "attached_info": "CsUFCJ7qm4COqI6nmwEQBBoJNjM1ODI5MDMwIJW9hqwGKLi9AjC/BEAOSigKHVRTX1NPVVJDRV9FRFVfVFJBSU5JTkdfRkVFRFJFEgEwGAAgADoAWgg5NTIyMzM3MGIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjMzMzE2MjgxMTaKAQk1OTgyNDM1OTGqAQlyZWNvbW1lbmTCASBhMDI2NWU5MzExN2QzZDM2NmFkZGEzNjMxMDE5NDcyN/IBDAgMEghUcmFpbmluZ/IBKAgKEiRmNjhlNzQ2NC0yMzc0LTRhODItYmMyMC0zMjdhOTJmNDE2YzXyAQUICxIBM4ICAIgC46DqmI0ykgIgYTAyNjVlOTMxMTdkM2QzNjZhZGRhMzYzMTAxOTQ3MjeaAgDKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxlygIOQ3VycmVuY3lSYW5rZXLKAg5zbG90SW5zZXJ0UnVsZdoCHVRTX1NPVVJDRV9FRFVfVFJBSU5JTkdfRkVFRFJF6AIF+gILTk9STUFMX0ZMT1eKAyBjNjc2OWJiNGE1ZDA0MjA3YjExYjJhNmJkZWQ5M2EzYpoDDQoCdjAQABoFb3RoZXKoA5zAjwTYAwDqAxFmZWVkcmVfZWR1X3JlY2FsbPoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABAGIBACSBAhUcmFpbmluZ5oEATWgBACoBACwBAC6BAZtYW51YWzCBAMxNzDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BJs3G/EZ1Jw/gQVs6Mbzlwo0QYkF+fX8fGmfpD+SBQCaBQNkZnSiBQNkZnSyBQExuQXIkjoFX+OcQNAFAOAFAOgFAPAFA5AGAJICJQoJNjM1ODI5MDMwEgozMzMxNjI4MTE2GAQiCklNQUdFX1RFWFQ=",
      "action_card": false
    }, {
      "id": "15_1721528651.842",
      "type": "feed",
      "offset": 15,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528651,
      "updated_time": 1721528651,
      "target": {
        "id": 3511854077,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3511854077",
        "author": {
          "id": "12589811865e47bdd57bd721c92040c3",
          "url": "https://api.zhihu.com/people/12589811865e47bdd57bd721c92040c3",
          "user_type": "people",
          "url_token": "charten-22",
          "name": "CharTen",
          "headline": "",
          "avatar_url": "https://pic1.zhimg.com/50/v2-148e2e30746113692cd6e2e384f63055_l.jpg?source=b6762063",
          "is_org": false,
          "gender": -1,
          "followers_count": 464,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1716811559,
        "updated_time": 1716811559,
        "voteup_count": 7,
        "thanks_count": 0,
        "comment_count": 12,
        "is_copyable": false,
        "question": {
          "id": 550275961,
          "type": "question",
          "url": "https://api.zhihu.com/questions/550275961",
          "author": {
            "id": "c17957fbccbc4128cc9119df3d239f67",
            "url": "https://api.zhihu.com/people/c17957fbccbc4128cc9119df3d239f67",
            "user_type": "people",
            "url_token": "kevin18-6",
            "name": "跟我一起秃秃秃",
            "headline": "",
            "avatar_url": "https://pica.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 1,
            "is_following": false,
            "is_followed": false
          },
          "title": "Tailwind CSS 是否属于旁门左道？",
          "created": 1661595390,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 1,
          "bound_topic_ids": [225, 1127, 4128, 410721, 377132],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "因为class太多，然后导致你的html模板不好看，所以你可以新增一个.class的一个文件用来存放你所写的Class列表。",
        "excerpt_new": "因为class太多，然后导致你的html模板不好看，所以你可以新增一个.class的一个文件用来存放你所写的Class列表。",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "disallowed",
        "content": "<p data-pid=\"5JsVvsMT\">因为class太多，然后导致你的html模板不好看，所以你可以新增一个.class的一个文件用来存放你所写的Class列表。</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 8977,
        "favorite_count": 1,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3511854077}",
      "attached_info": "Co8FCJ7qm4COqI6nmwEQBBoJNjY4NTkwMTk1IKfu0bIGKAcwDEAPSiMKFVRTX1NPVVJDRV9USEVNRV9NRVJHRRIEMTA2MhgAIAA6AEotCh1UU19TT1VSQ0VfSU5URVJFU1RfV09SRF9NRVJHRRIGMTcyOTUxGAAgADoAWgg4NDU2NzI4NGIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjM1MTE4NTQwNzeKAQk1NTAyNzU5NjGqAQlyZWNvbW1lbmTCASAxMjU4OTgxMTg2NWU0N2JkZDU3YmQ3MjFjOTIwNDBjM/IBCggMEgZOb3JtYWzyASgIChIkNWY0NGI3NDMtYTJmZS00NTgxLWFhMDAtZTMxZmZlM2Q3ZDQx8gEFCAsSATOCAgCIAuOg6piNMpICIDEyNTg5ODExODY1ZTQ3YmRkNTdiZDcyMWM5MjA0MGMzmgIA2gIVVFNfU09VUkNFX1RIRU1FX01FUkdF6AIC+gILTk9STUFMX0ZMT1eKAyBjNjc2OWJiNGE1ZDA0MjA3YjExYjJhNmJkZWQ5M2EzYpoDDQoCdjAQABoFb3RoZXKoA5FG2AMA6gMbVGhlbWVNZXJnZU5ld1YxUG9vbFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAMxNzDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAACC2Csc/gQUAAAAAAAAAAIkF+fX8fGmfpD+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFA5AGAJICJQoJNjY4NTkwMTk1EgozNTExODU0MDc3GAQiCklNQUdFX1RFWFQ=",
      "action_card": false
    }, {
      "id": "16_1721528651.536",
      "type": "feed",
      "offset": 16,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528651,
      "updated_time": 1721528651,
      "target": {
        "id": 3330921827,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3330921827",
        "author": {
          "id": "b4f1033015665651c93aba80ac04faa6",
          "url": "https://api.zhihu.com/people/b4f1033015665651c93aba80ac04faa6",
          "user_type": "organization",
          "url_token": "an-jian-shou-ji-17",
          "name": "案件手记",
          "headline": "",
          "avatar_url": "https://pic1.zhimg.com/50/v2-c05b91ca4612d25833e25503d01d29c1_l.jpg?source=b6762063",
          "is_org": true,
          "gender": -1,
          "followers_count": 294734,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1702956715,
        "updated_time": 1710840615,
        "voteup_count": 5030,
        "thanks_count": 841,
        "comment_count": 61,
        "is_copyable": false,
        "question": {
          "id": 521347610,
          "type": "question",
          "url": "https://api.zhihu.com/questions/521347610",
          "author": {
            "id": "46016825b56c850299e0ae83ee640160",
            "url": "https://api.zhihu.com/people/46016825b56c850299e0ae83ee640160",
            "user_type": "people",
            "url_token": "chen-su-qin-1-37",
            "name": "相约宜尘",
            "headline": "世事沧桑 人间值得",
            "avatar_url": "https://picx.zhimg.com/50/v2-4a3a2d63065cf43832c03c309edf5008_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 0,
            "followers_count": 121,
            "is_following": false,
            "is_followed": false
          },
          "title": "一个人的预感能有多准？",
          "created": 1646990547,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 9,
          "bound_topic_ids": [922, 1027],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "thumbnail": "https://picx.zhimg.com/50/v2-d39de6915d19bbc4d2bab573c71c9589_720w.jpg?source=b6762063",
        "excerpt": "2019 年，美国有个主妇，意识到家里藏着变态，24 小时监视自己。 这个变态，比她入住更早，还会「隐形」。 最可怕的是，此人准备对她们一家四口，进行人体改造。 而「实验」被取名为：「鼠人」改造计划。 01 一套 400 多平的夏威夷海景洋房，精装、双车位，会让你流口水吗？ 对于坎贝尔女士而言，她的这套房却是一场不折不扣的噩梦。 2019 年，她和新婚丈夫詹姆斯拿到了新房钥匙。 房子在檀香山郊区的一处山崖上，虽说有点偏，但…",
        "excerpt_new": "2019 年，美国有个主妇，意识到家里藏着变态，24 小时监视自己。 这个变态，比她入住更早，还会「隐形」。 最可怕的是，此人准备对她们一家四口，进行人体改造。 而「实验」被取名为：「鼠人」改造计划。 01 一套 400 多平的夏威夷海景洋房，精装、双车位，会让你流口水吗？ 对于坎贝尔女士而言，她的这套房却是一场不折不扣的噩梦。 2019 年，她和新婚丈夫詹姆斯拿到了新房钥匙。 房子在檀香山郊区的一处山崖上，虽说有点偏，但…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "disallowed",
        "content": "<blockquote>2019 年，美国有个主妇，意识到家里藏着变态，24 小时监视自己。<br/>\n这个变态，比她入住更早，还会「隐形」。<br/>\n最可怕的是，此人准备对她们一家四口，进行人体改造。<br/>\n而「实验」被取名为：「鼠人」改造计划。</blockquote>\n<p>01</p>\n<p>一套 400 多平的夏威夷海景洋房，精装、双车位，会让你流口水吗？</p>\n<p>对于坎贝尔女士而言，她的这套房却是一场不折不扣的噩梦。</p>\n<p>2019 年，她和新婚丈夫詹姆斯拿到了新房钥匙。</p>\n<p>房子在檀香山郊区的一处山崖上，虽说有点偏，但相当安静，治安也不错。</p>\n<p>——可刚搬进去没多久，坎贝尔就感觉，这房里……可能藏着其他人。</p>\n<p>在西方世界，有个词叫 phrogging，指的就是家里潜藏着的不速之客。</p>\n<p>本意是传说里的那种，躲在人家里的吃人鬼。</p>\n<p>坎贝尔不大信鬼神那套，但一件件诡异事件，却实实在在地发生了。</p>\n<p>第一次感觉不对劲，是 9 月的一个傍晚。</p>\n<p>当时，坎贝尔准备去车库收拾东西。</p>\n<p>因为新搬才三天，小夫妻俩之前旧宅的大量家当，都打包装箱后，随意堆放在车库。</p>\n<p>打算闲下来再慢慢收拾。</p>\n<p>可当坎贝尔刚推开车库的门，就情不自禁爆了句粗：</p>\n<p>「What the fuck……」</p>\n<p>原来，那一个个封上胶带的大纸箱，居然全被拆开了。</p>\n<p>里面的各种物品，散落了一地，那叫一个七零八落……</p>\n<figure><img src=\"https://pic1.zhimg.com/v2-8aded4d3b31a9527c8ae32f91b1554a0_b.jpg\" alt=\"事发车库现场\" data-rawwidth=\"954\" data-rawheight=\"640\" data-original-token=\"v2-8aded4d3b31a9527c8ae32f91b1554a0\" class=\"origin_image zh-lightbox-thumb\" width=\"954\" data-original=\"https://pic1.zhimg.com/v2-8aded4d3b31a9527c8ae32f91b1554a0_r.jpg\"/></figure>事发车库现场\n<p>此情此景，坎贝尔冒出来头个想法就是：</p>\n<p>「家里遭贼了啊！」</p>\n<p>她立马跑进屋，叫来丈夫。</p>\n<p>对方目睹这一切后也挺懵逼，并声称：自己从来没动过箱子。</p>\n<p>詹姆斯是现役军人，在夏威夷海军服役，相比手足无措的妻子，他要冷静得多。</p>\n<p>他不动神色，在车库里来来回回绕了一圈，丢下一句话：</p>\n<p>「可能不是贼。」</p>\n<p>「啊，为啥？」</p>\n<p>詹姆斯从地上捡起来一块表：</p>\n<p>「这是老头子送我的积家表，能值个好几万。如果是贼，怎么可能不带走？」</p>\n<p>坎贝尔点了点头，她看到自己的几个首饰盒也在地上，里面的珠宝一样没少。</p>\n<p>果然，检查了一圈，没发现任何东西丢失。</p>\n<p>这时，詹姆斯又指着那些散落的物品：</p>\n<p>「我突然发现……这些玩意看着像是被乱扔在车库，实际可能并不是……」</p>\n<p>他走过去比划了下：</p>\n<p>「这些东西，好像被排列成了一个圆形。」</p>\n<p>坎贝尔一看，还真的是。</p>\n<p>如果不是贼，那会是什么人呢？</p>\n<figure><img src=\"https://pic4.zhimg.com/v2-7a432e4a474f9c67975bc1c3fe651e97_b.jpg\" alt=\"\" data-rawwidth=\"554\" data-rawheight=\"342\" data-original-token=\"v2-7a432e4a474f9c67975bc1c3fe651e97\" class=\"origin_image zh-lightbox-thumb\" width=\"554\" data-original=\"https://pic4.zhimg.com/v2-7a432e4a474f9c67975bc1c3fe651e97_r.jpg\"/></figure>\n<p><br/>\n她看着那一圈东西，脑中想起了那些恐怖片里的桥段，什么召唤邪神、幽灵之类……</p>\n<p>顿时，整个人都更不好了。</p>\n<p>她忽然想起什么，说了句：「该不会是……」</p>\n<p>詹姆斯见她欲言又止，还面有难色的样子，赶紧追问她想到了什么。</p>\n<p>过了半天，坎贝尔才开口：</p>\n<p>「会不会是俩孩子捣的乱？对不起……我只是猜测喔。」</p>\n<p>之所以措辞这么委婉，是因为孩子俩并不是她亲生的。</p>\n<p>这对小夫妻，是一对重组家庭。</p>\n<p>他俩本是高中同学兼恋人，但后来没处下去，分了。</p>\n<p>几年后，俩人各自成家，又都爆出严重的感情问题。</p>\n<p>他俩不约而同觉着：还是旧爱香啊……</p>\n<p>于是，就这么破镜重圆了。</p>\n<figure><img src=\"https://pica.zhimg.com/v2-e7653943b2eefa7dc7d44b28c57c6c7c_b.png\" alt=\"詹姆斯和坎贝尔夫妇\" data-rawwidth=\"816\" data-rawheight=\"814\" data-original-token=\"v2-e7653943b2eefa7dc7d44b28c57c6c7c\" class=\"origin_image zh-lightbox-thumb\" width=\"816\" data-original=\"https://pica.zhimg.com/v2-e7653943b2eefa7dc7d44b28c57c6c7c_r.jpg\"/></figure>詹姆斯和坎贝尔夫妇\n<p>如今家里的俩小孩，都是詹姆斯和前妻的仔，大的 12 岁，小的 6 岁。</p>\n<p>这个年纪的小子，确实是有调皮捣蛋的无限潜力。</p>\n<p>夫妻俩赶紧找来孩子，一问，俩小孩都矢口否认是自己干的。</p>\n<p>但詹姆斯却不大信，从他的角度看，他觉得这种事没有其他解释。</p>\n<p>作为一个精明强干的军人，他根本不信怪力乱神那一套，也不觉得电影里那些乱编的剧情，会发生在现实里。</p>\n<p>可坎贝尔却觉得，孩子的表情不像说谎。</p>\n<p>但她也不想把事闹大，还是想再观望下看看。</p>\n<p>这么一观望，就等来了第二次的诡异事件……</p>\n<p>02</p>\n<p>一天后的一个早晨，老公照常去部队上班，孩子也照常上学。</p>\n<p>只留下坎贝尔一个在家。</p>\n<p>她不甘心当全职太太，打算学点化妆技巧，当个直播网红。</p>\n<p>于是，她便坐在二楼主卧的化妆台前，打开了油管某频道，跟着博主一板一眼学了起来。</p>\n<p>正专注着，忽然，一阵奇怪的动静从楼下传来……</p>\n<p>那是「吱啦……咯噔」两声。</p>\n<p>听起来像有人在开关门。</p>\n<p>孤身一人的坎贝尔，顿时毛骨悚然。</p>\n<p>她随手拿起一柄球棍，屏住呼吸，蹑手蹑脚走下了楼，循着刚刚的响声过去。</p>\n<p>偌大的房子里空荡荡，再未有任何动静。</p>\n<p>坎贝尔球棍攥得手心冒汗，一间屋一间屋地摸过去。</p>\n<figure><img src=\"https://pic3.zhimg.com/v2-93d96d2accff39cc2feaa7438c7b0edc_b.png\" alt=\"\" data-rawwidth=\"796\" data-rawheight=\"548\" data-original-token=\"v2-93d96d2accff39cc2feaa7438c7b0edc\" class=\"origin_image zh-lightbox-thumb\" width=\"796\" data-original=\"https://pic3.zhimg.com/v2-93d96d2accff39cc2feaa7438c7b0edc_r.jpg\"/></figure>\n<p>楼下的卧室、书房、客厅、洗衣房，每进到一间，她都仔细检查了。</p>\n<p>确认无人后，便把门紧紧锁死。</p>\n<p>没想到，这样一圈搜过来，愣是啥人影也没发现。</p>\n<p>她不放心，又用同样的方式，检查了一遍二楼，依然没有发现任何人。</p>\n<p>坎贝尔坐回化妆台前，看着镜子中的自己，衬衣都汗透了。</p>\n<p>有一点她很确信，之前听见的，就是开关门的声音。</p>\n<p>至于是哪扇门，就不清楚了。</p>\n<p>——她家包括大门在内的全部房门，都用的是同一个牌子和型号的门锁。</p>\n<p>「会不会是有人偷偷开门溜出去了，所以才死活找不到？」</p>\n<p>这么一想，她更加恐慌了。</p>\n<p>这意味着，这个人不知何时而来，且一直呆在自己家里。</p>\n<p>坎贝尔越想越怕，还是决定拨通电话，把丈夫叫了回来。</p>\n<p>詹姆斯回家后也检查了一遍，同样一无所获，他甚至有点生气：</p>\n<p>「拜托，部队讲纪律的。如果不是大事，别这么催我回来。」</p>\n<p>坎贝尔也火了：</p>\n<p>「家里有外人，这也不算大事吗？」</p>\n<p>詹姆斯有些不耐烦：「可我们不是都检查过了吗，不可能有人躲在咱家啊！」</p>\n<p>「那门的声音怎么解释？」</p>\n<p>「指不定就是一阵穿堂风，给门刮带上了呢？」</p>\n<p>坎贝尔脸都黑了。她觉着眼前的男人简直不可理喻。</p>\n<figure><img src=\"https://pic4.zhimg.com/v2-af0bf2ea090c1608b47b3e57eeb47b6b_b.jpg\" alt=\"詹姆斯和坎贝尔夫妻\" data-rawwidth=\"854\" data-rawheight=\"480\" data-original-token=\"v2-af0bf2ea090c1608b47b3e57eeb47b6b\" class=\"origin_image zh-lightbox-thumb\" width=\"854\" data-original=\"https://pic4.zhimg.com/v2-af0bf2ea090c1608b47b3e57eeb47b6b_r.jpg\"/></figure>詹姆斯和坎贝尔夫妻\n<p>俩人最终妥协的结果，是加装个全屋监控系统。</p>\n<p>不过，檀香山不比美国本土，下完单，要从岛外运过来，再等安排调试专员上门，时间至少得两周。</p>\n<p>好不容易捱到了晚上，一家人吃过晚饭，孩子都睡了，坎贝尔又开始紧张起来。</p>\n<p>她开始怀疑，冰箱里的食物是不是突然变少了。</p>\n<p>而且她感觉，这新房一到晚上，就特别安静、空旷，有种幽邃的感觉。</p>\n<p>詹姆斯又累又困，只能勉强安抚老婆说：</p>\n<p>「放心睡吧，别疑神疑鬼了。」 </p>\n<p>坎贝尔没说话，她只是希望丈夫能真正重视这件事。</p>\n<p>所幸，当天夜里，她的愿望就实现了……</p>\n<p>诡异之事，再度降临。</p>\n<p>03</p>\n<p>大约凌晨 3 点多，詹姆斯被一泡尿憋醒。</p>\n<p>刚上完卫生间打算回笼觉，就听见楼下传来「吱啦……咯噔」一阵响声。</p>\n<p>詹姆斯一个激灵，睡意全无。</p>\n<p>他轻轻叫醒坎贝尔，指了指楼下，又在她耳边说：</p>\n<p>「我下去看看，你去孩子房间，把门锁死。」</p>\n<p>说完，他拉开床头柜抽屉，从里面取出一把手枪，便轻手轻脚出了卧室。</p>\n<p>——夏威夷州对平民持枪管控极严，好在作为军人的詹姆斯拥有特殊执照。</p>\n<p>刚出门，他便给枪上了膛。</p>\n<p>然后凝神屏息，贴着墙壁下楼，双眼注视着一片黑暗的一楼。</p>\n<p>便在此时，那「吱啦……咯噔」的声音又响了。</p>\n<p>距离如此之近，詹姆斯这一次听得清清楚楚，绝对是有人在开关房门的声音。</p>\n<p>一瞬间，他浑身鸡皮疙瘩都起来了：</p>\n<p>「房子里真的有人！」</p>\n<p>到底是职业军人，詹姆斯强压住恐惧，双手紧紧握住枪，一个房间一个房间地搜。</p>\n<p>然而，每个房间里都空无一人。</p>\n<figure><img src=\"https://pic3.zhimg.com/v2-9ec230434128e818fdb83f713f9a0562_b.png\" alt=\"\" data-rawwidth=\"784\" data-rawheight=\"442\" data-original-token=\"v2-9ec230434128e818fdb83f713f9a0562\" class=\"origin_image zh-lightbox-thumb\" width=\"784\" data-original=\"https://pic3.zhimg.com/v2-9ec230434128e818fdb83f713f9a0562_r.jpg\"/></figure>\n<p>哪怕是最小的壁橱，他也全都打开检查了一遍。还是无果。</p>\n<p>真他妈见鬼了啊……</p>\n<p>詹姆斯满心疑虑地走进一楼的卫生间，放冷水洗了把脸，想让自己清醒一下。</p>\n<p>就在他抬起头，望向镜子时，他发现了一丝异样。</p>\n<p>镜子反射的，是卫生间对面洗衣房的门。</p>\n<p>透过门上的毛玻璃窗户，能隐约看到……一个黑黢黢的人影。</p>\n<p>那个人似乎隔着毛玻璃，在洗衣房里注视着自己。</p>\n<p>一动不动。</p>\n<figure><img src=\"https://pic2.zhimg.com/v2-d893e305ae4a12e56d5fd261fb29e2b7_b.jpg\" alt=\"\" data-rawwidth=\"1271\" data-rawheight=\"713\" data-original-token=\"v2-d893e305ae4a12e56d5fd261fb29e2b7\" class=\"origin_image zh-lightbox-thumb\" width=\"1271\" data-original=\"https://pic2.zhimg.com/v2-d893e305ae4a12e56d5fd261fb29e2b7_r.jpg\"/></figure>\n<p><br/>\n詹姆斯立马转身望去，窗后人影居然倏地消失了。</p>\n<p>还伴随着一阵悉悉索索的响动。</p>\n<p>「是谁，给老子滚出来！」</p>\n<p>詹姆斯毫不迟疑抽出了枪，对准了洗衣房的门。</p>\n<p>时间都仿佛凝固了。</p>\n<p>等了十来秒，没有动静。</p>\n<p>他憋不住了，端枪就冲进了洗衣房，令他震惊的是，里面居然还是没有人。</p>\n<p>没有人。莫非真的是鬼吗？</p>\n<p>詹姆斯四下检查了一遍，真的没人。</p>\n<p>这么堪称灵异的事件，他生平还头一次碰上。</p>\n<p>这天后半夜，詹姆斯带着妻子在俩儿子房间打了地铺，锁死了门。</p>\n<p>他守在门边，隔一阵子就警醒一次。</p>\n<p>好在，总算是平安无事。</p>\n<p>第二天，他们开了个家庭会议。</p>\n<p>夫妻俩这才从儿子们那里，得知了一些之前不知道的情况：</p>\n<p>原来，孩子们之前就发现，有些东西会突然消失几天，然后又突然出现。</p>\n<p>比如小儿子的乐高玩具，某天就不见了。</p>\n<p>过了半周，它又出现在了床头，还被搭成了另外的样子。</p>\n<p>「我的 Switch 也是，再次出现时，里面的游戏都被删了。」</p>\n<p>大儿子也补充道，他当时还以为是弟弟的恶作剧，俩人为此吵了一架。</p>\n<p>「不对劲……太不对劲了。」</p>\n<p>夫妻俩越听越觉得恐怖。</p>\n<p>他们越来越确定，这个家里必然有其他人在。</p>\n<p>但他们死活整不明白：这个人是怎么做到「隐身」，还能跟一家人共同生活的？</p>\n<p>这个新家虽说挺大，但要藏一个大活人，完全不被发现，那还真的不容易。</p>\n<p>更细思极恐的是，这个人的目的究竟是什么呢？</p>\n<p>他既不图财，目前为止，也没有展露什么暴力意图。</p>\n<p>感觉就像一个寄生在人家的幽灵，随时盯住一家人的一举一动。</p>\n<p>这种动机的未知，更让人无比恐惧。</p>\n<p>「不成，这问题不解决，我一天都住不下去。」</p>\n<p>坎贝尔的声音都快带着哭腔了。</p>\n<p>詹姆斯点了点头，他也觉得事态有点严重了。</p>\n<p>但他始终没有做一件事：报警。</p>\n<p>或许在他看来，一个海军大兵不该屁大点事就找警察，他觉得自己完全能处理。</p>\n<p>不过，他也不敢拿孩子的安全开玩笑。思来想去，他想到一个解决方案：</p>\n<p>先带着全家人，飞去加州的父母家，小住几天。</p>\n<p>等监控到货了，再回来。</p>\n<p>当天上午，他便向部队请了休假，一家四口离开了这个闹鬼的房子。</p>\n<p>一周后，装监控的人通知货到，随时可以上门。</p>\n<p>放松许久的全家人，也调整了心情，飞回了檀香山。</p>\n<p>从机场取了车，一家人有说有笑开到家门口时，已经是晚上 10 点多了。</p>\n<p>汽车沿着山坡环绕，一片昏黄的灯光下，自家房子的轮廓出现在前窗视野中。</p>\n<p>可这一幕，非但没有家的温馨，反而催生出强烈的不安感，笼罩着一家人。</p>\n",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 1296284,
        "thumbnails": ["https://picx.zhimg.com/50/v2-d39de6915d19bbc4d2bab573c71c9589_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-861bd0d8178a245232a711023b544e70_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-01d39168e77b322444379230cec31ec5_720w.jpg?source=b6762063"],
        "favorite_count": 2652,
        "answer_type": "paid",
        "paid_info": {
          "type": "paid_column",
          "content": "<blockquote>2019 年，美国有个主妇，意识到家里藏着变态，24 小时监视自己。<br/>\n这个变态，比她入住更早，还会「隐形」。<br/>\n最可怕的是，此人准备对她们一家四口，进行人体改造。<br/>\n而「实验」被取名为：「鼠人」改造计划。</blockquote>\n<p>01</p>\n<p>一套 400 多平的夏威夷海景洋房，精装、双车位，会让你流口水吗？</p>\n<p>对于坎贝尔女士而言，她的这套房却是一场不折不扣的噩梦。</p>\n<p>2019 年，她和新婚丈夫詹姆斯拿到了新房钥匙。</p>\n<p>房子在檀香山郊区的一处山崖上，虽说有点偏，但相当安静，治安也不错。</p>\n<p>——可刚搬进去没多久，坎贝尔就感觉，这房里……可能藏着其他人。</p>\n<p>在西方世界，有个词叫 phrogging，指的就是家里潜藏着的不速之客。</p>\n<p>本意是传说里的那种，躲在人家里的吃人鬼。</p>\n<p>坎贝尔不大信鬼神那套，但一件件诡异事件，却实实在在地发生了。</p>\n<p>第一次感觉不对劲，是 9 月的一个傍晚。</p>\n<p>当时，坎贝尔准备去车库收拾东西。</p>\n<p>因为新搬才三天，小夫妻俩之前旧宅的大量家当，都打包装箱后，随意堆放在车库。</p>\n<p>打算闲下来再慢慢收拾。</p>\n<p>可当坎贝尔刚推开车库的门，就情不自禁爆了句粗：</p>\n<p>「What the fuck……」</p>\n<p>原来，那一个个封上胶带的大纸箱，居然全被拆开了。</p>\n<p>里面的各种物品，散落了一地，那叫一个七零八落……</p>\n<figure><noscript><img src=\"https://pic1.zhimg.com/50/v2-8aded4d3b31a9527c8ae32f91b1554a0_720w.jpg?source=2c26e567\" alt=\"事发车库现场\" data-rawwidth=\"954\" data-rawheight=\"640\" data-original-token=\"v2-8aded4d3b31a9527c8ae32f91b1554a0\" class=\"origin_image zh-lightbox-thumb\" width=\"954\" data-original=\"https://picx.zhimg.com/v2-8aded4d3b31a9527c8ae32f91b1554a0_r.jpg?source=2c26e567\"/></noscript><img src=\"data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;954&#39; height=&#39;640&#39;&gt;&lt;/svg&gt;\" alt=\"事发车库现场\" data-rawwidth=\"954\" data-rawheight=\"640\" data-original-token=\"v2-8aded4d3b31a9527c8ae32f91b1554a0\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"954\" data-original=\"https://picx.zhimg.com/v2-8aded4d3b31a9527c8ae32f91b1554a0_r.jpg?source=2c26e567\" data-actualsrc=\"https://pic1.zhimg.com/50/v2-8aded4d3b31a9527c8ae32f91b1554a0_720w.jpg?source=2c26e567\"/></figure>事发车库现场\n<p>此情此景，坎贝尔冒出来头个想法就是：</p>\n<p>「家里遭贼了啊！」</p>\n<p>她立马跑进屋，叫来丈夫。</p>\n<p>对方目睹这一切后也挺懵逼，并声称：自己从来没动过箱子。</p>\n<p>詹姆斯是现役军人，在夏威夷海军服役，相比手足无措的妻子，他要冷静得多。</p>\n<p>他不动神色，在车库里来来回回绕了一圈，丢下一句话：</p>\n<p>「可能不是贼。」</p>\n<p>「啊，为啥？」</p>\n<p>詹姆斯从地上捡起来一块表：</p>\n<p>「这是老头子送我的积家表，能值个好几万。如果是贼，怎么可能不带走？」</p>\n<p>坎贝尔点了点头，她看到自己的几个首饰盒也在地上，里面的珠宝一样没少。</p>\n<p>果然，检查了一圈，没发现任何东西丢失。</p>\n<p>这时，詹姆斯又指着那些散落的物品：</p>\n<p>「我突然发现……这些玩意看着像是被乱扔在车库，实际可能并不是……」</p>\n<p>他走过去比划了下：</p>\n<p>「这些东西，好像被排列成了一个圆形。」</p>\n<p>坎贝尔一看，还真的是。</p>\n<p>如果不是贼，那会是什么人呢？</p>\n<figure><noscript><img src=\"https://pic1.zhimg.com/50/v2-7a432e4a474f9c67975bc1c3fe651e97_720w.jpg?source=2c26e567\" alt=\"\" data-rawwidth=\"554\" data-rawheight=\"342\" data-original-token=\"v2-7a432e4a474f9c67975bc1c3fe651e97\" class=\"origin_image zh-lightbox-thumb\" width=\"554\" data-original=\"https://picx.zhimg.com/v2-7a432e4a474f9c67975bc1c3fe651e97_r.jpg?source=2c26e567\"/></noscript><img src=\"data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;554&#39; height=&#39;342&#39;&gt;&lt;/svg&gt;\" alt=\"\" data-rawwidth=\"554\" data-rawheight=\"342\" data-original-token=\"v2-7a432e4a474f9c67975bc1c3fe651e97\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"554\" data-original=\"https://picx.zhimg.com/v2-7a432e4a474f9c67975bc1c3fe651e97_r.jpg?source=2c26e567\" data-actualsrc=\"https://pic1.zhimg.com/50/v2-7a432e4a474f9c67975bc1c3fe651e97_720w.jpg?source=2c26e567\"/></figure>\n<p><br/>\n她看着那一圈东西，脑中想起了那些恐怖片里的桥段，什么召唤邪神、幽灵之类……</p>\n<p>顿时，整个人都更不好了。</p>\n<p>她忽然想起什么，说了句：「该不会是……」</p>\n<p>詹姆斯见她欲言又止，还面有难色的样子，赶紧追问她想到了什么。</p>\n<p>过了半天，坎贝尔才开口：</p>\n<p>「会不会是俩孩子捣的乱？对不起……我只是猜测喔。」</p>\n<p>之所以措辞这么委婉，是因为孩子俩并不是她亲生的。</p>\n<p>这对小夫妻，是一对重组家庭。</p>\n<p>他俩本是高中同学兼恋人，但后来没处下去，分了。</p>\n<p>几年后，俩人各自成家，又都爆出严重的感情问题。</p>\n<p>他俩不约而同觉着：还是旧爱香啊……</p>\n<p>于是，就这么破镜重圆了。</p>\n<figure><noscript><img src=\"https://picx.zhimg.com/50/v2-e7653943b2eefa7dc7d44b28c57c6c7c_720w.jpg?source=2c26e567\" alt=\"詹姆斯和坎贝尔夫妇\" data-rawwidth=\"816\" data-rawheight=\"814\" data-original-token=\"v2-e7653943b2eefa7dc7d44b28c57c6c7c\" class=\"origin_image zh-lightbox-thumb\" width=\"816\" data-original=\"https://picx.zhimg.com/v2-e7653943b2eefa7dc7d44b28c57c6c7c_r.jpg?source=2c26e567\"/></noscript><img src=\"data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;816&#39; height=&#39;814&#39;&gt;&lt;/svg&gt;\" alt=\"詹姆斯和坎贝尔夫妇\" data-rawwidth=\"816\" data-rawheight=\"814\" data-original-token=\"v2-e7653943b2eefa7dc7d44b28c57c6c7c\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"816\" data-original=\"https://picx.zhimg.com/v2-e7653943b2eefa7dc7d44b28c57c6c7c_r.jpg?source=2c26e567\" data-actualsrc=\"https://picx.zhimg.com/50/v2-e7653943b2eefa7dc7d44b28c57c6c7c_720w.jpg?source=2c26e567\"/></figure>詹姆斯和坎贝尔夫妇\n<p>如今家里的俩小孩，都是詹姆斯和前妻的仔，大的 12 岁，小的 6 岁。</p>\n<p>这个年纪的小子，确实是有调皮捣蛋的无限潜力。</p>\n<p>夫妻俩赶紧找来孩子，一问，俩小孩都矢口否认是自己干的。</p>\n<p>但詹姆斯却不大信，从他的角度看，他觉得这种事没有其他解释。</p>\n<p>作为一个精明强干的军人，他根本不信怪力乱神那一套，也不觉得电影里那些乱编的剧情，会发生在现实里。</p>\n<p>可坎贝尔却觉得，孩子的表情不像说谎。</p>\n<p>但她也不想把事闹大，还是想再观望下看看。</p>\n<p>这么一观望，就等来了第二次的诡异事件……</p>\n<p>02</p>\n<p>一天后的一个早晨，老公照常去部队上班，孩子也照常上学。</p>\n<p>只留下坎贝尔一个在家。</p>\n<p>她不甘心当全职太太，打算学点化妆技巧，当个直播网红。</p>\n<p>于是，她便坐在二楼主卧的化妆台前，打开了油管某频道，跟着博主一板一眼学了起来。</p>\n<p>正专注着，忽然，一阵奇怪的动静从楼下传来……</p>\n<p>那是「吱啦……咯噔」两声。</p>\n<p>听起来像有人在开关门。</p>\n<p>孤身一人的坎贝尔，顿时毛骨悚然。</p>\n<p>她随手拿起一柄球棍，屏住呼吸，蹑手蹑脚走下了楼，循着刚刚的响声过去。</p>\n<p>偌大的房子里空荡荡，再未有任何动静。</p>\n<p>坎贝尔球棍攥得手心冒汗，一间屋一间屋地摸过去。</p>\n<figure><noscript><img src=\"https://picx.zhimg.com/50/v2-93d96d2accff39cc2feaa7438c7b0edc_720w.jpg?source=2c26e567\" alt=\"\" data-rawwidth=\"796\" data-rawheight=\"548\" data-original-token=\"v2-93d96d2accff39cc2feaa7438c7b0edc\" class=\"origin_image zh-lightbox-thumb\" width=\"796\" data-original=\"https://picx.zhimg.com/v2-93d96d2accff39cc2feaa7438c7b0edc_r.jpg?source=2c26e567\"/></noscript><img src=\"data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;796&#39; height=&#39;548&#39;&gt;&lt;/svg&gt;\" alt=\"\" data-rawwidth=\"796\" data-rawheight=\"548\" data-original-token=\"v2-93d96d2accff39cc2feaa7438c7b0edc\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"796\" data-original=\"https://picx.zhimg.com/v2-93d96d2accff39cc2feaa7438c7b0edc_r.jpg?source=2c26e567\" data-actualsrc=\"https://picx.zhimg.com/50/v2-93d96d2accff39cc2feaa7438c7b0edc_720w.jpg?source=2c26e567\"/></figure>\n<p>楼下的卧室、书房、客厅、洗衣房，每进到一间，她都仔细检查了。</p>\n<p>确认无人后，便把门紧紧锁死。</p>\n<p>没想到，这样一圈搜过来，愣是啥人影也没发现。</p>\n<p>她不放心，又用同样的方式，检查了一遍二楼，依然没有发现任何人。</p>\n<p>坎贝尔坐回化妆台前，看着镜子中的自己，衬衣都汗透了。</p>\n<p>有一点她很确信，之前听见的，就是开关门的声音。</p>\n<p>至于是哪扇门，就不清楚了。</p>\n<p>——她家包括大门在内的全部房门，都用的是同一个牌子和型号的门锁。</p>\n<p>「会不会是有人偷偷开门溜出去了，所以才死活找不到？」</p>\n<p>这么一想，她更加恐慌了。</p>\n<p>这意味着，这个人不知何时而来，且一直呆在自己家里。</p>\n<p>坎贝尔越想越怕，还是决定拨通电话，把丈夫叫了回来。</p>\n<p>詹姆斯回家后也检查了一遍，同样一无所获，他甚至有点生气：</p>\n<p>「拜托，部队讲纪律的。如果不是大事，别这么催我回来。」</p>\n<p>坎贝尔也火了：</p>\n<p>「家里有外人，这也不算大事吗？」</p>\n<p>詹姆斯有些不耐烦：「可我们不是都检查过了吗，不可能有人躲在咱家啊！」</p>\n<p>「那门的声音怎么解释？」</p>\n<p>「指不定就是一阵穿堂风，给门刮带上了呢？」</p>\n<p>坎贝尔脸都黑了。她觉着眼前的男人简直不可理喻。</p>\n<figure><noscript><img src=\"https://picx.zhimg.com/50/v2-af0bf2ea090c1608b47b3e57eeb47b6b_720w.jpg?source=2c26e567\" alt=\"詹姆斯和坎贝尔夫妻\" data-rawwidth=\"854\" data-rawheight=\"480\" data-original-token=\"v2-af0bf2ea090c1608b47b3e57eeb47b6b\" class=\"origin_image zh-lightbox-thumb\" width=\"854\" data-original=\"https://pica.zhimg.com/v2-af0bf2ea090c1608b47b3e57eeb47b6b_r.jpg?source=2c26e567\"/></noscript><img src=\"data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;854&#39; height=&#39;480&#39;&gt;&lt;/svg&gt;\" alt=\"詹姆斯和坎贝尔夫妻\" data-rawwidth=\"854\" data-rawheight=\"480\" data-original-token=\"v2-af0bf2ea090c1608b47b3e57eeb47b6b\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"854\" data-original=\"https://pica.zhimg.com/v2-af0bf2ea090c1608b47b3e57eeb47b6b_r.jpg?source=2c26e567\" data-actualsrc=\"https://picx.zhimg.com/50/v2-af0bf2ea090c1608b47b3e57eeb47b6b_720w.jpg?source=2c26e567\"/></figure>詹姆斯和坎贝尔夫妻\n<p>俩人最终妥协的结果，是加装个全屋监控系统。</p>\n<p>不过，檀香山不比美国本土，下完单，要从岛外运过来，再等安排调试专员上门，时间至少得两周。</p>\n<p>好不容易捱到了晚上，一家人吃过晚饭，孩子都睡了，坎贝尔又开始紧张起来。</p>\n<p>她开始怀疑，冰箱里的食物是不是突然变少了。</p>\n<p>而且她感觉，这新房一到晚上，就特别安静、空旷，有种幽邃的感觉。</p>\n<p>詹姆斯又累又困，只能勉强安抚老婆说：</p>\n<p>「放心睡吧，别疑神疑鬼了。」 </p>\n<p>坎贝尔没说话，她只是希望丈夫能真正重视这件事。</p>\n<p>所幸，当天夜里，她的愿望就实现了……</p>\n<p>诡异之事，再度降临。</p>\n<p>03</p>\n<p>大约凌晨 3 点多，詹姆斯被一泡尿憋醒。</p>\n<p>刚上完卫生间打算回笼觉，就听见楼下传来「吱啦……咯噔」一阵响声。</p>\n<p>詹姆斯一个激灵，睡意全无。</p>\n<p>他轻轻叫醒坎贝尔，指了指楼下，又在她耳边说：</p>\n<p>「我下去看看，你去孩子房间，把门锁死。」</p>\n<p>说完，他拉开床头柜抽屉，从里面取出一把手枪，便轻手轻脚出了卧室。</p>\n<p>——夏威夷州对平民持枪管控极严，好在作为军人的詹姆斯拥有特殊执照。</p>\n<p>刚出门，他便给枪上了膛。</p>\n<p>然后凝神屏息，贴着墙壁下楼，双眼注视着一片黑暗的一楼。</p>\n<p>便在此时，那「吱啦……咯噔」的声音又响了。</p>\n<p>距离如此之近，詹姆斯这一次听得清清楚楚，绝对是有人在开关房门的声音。</p>\n<p>一瞬间，他浑身鸡皮疙瘩都起来了：</p>\n<p>「房子里真的有人！」</p>\n<p>到底是职业军人，詹姆斯强压住恐惧，双手紧紧握住枪，一个房间一个房间地搜。</p>\n<p>然而，每个房间里都空无一人。</p>\n<figure><noscript><img src=\"https://pic1.zhimg.com/50/v2-9ec230434128e818fdb83f713f9a0562_720w.jpg?source=2c26e567\" alt=\"\" data-rawwidth=\"784\" data-rawheight=\"442\" data-original-token=\"v2-9ec230434128e818fdb83f713f9a0562\" class=\"origin_image zh-lightbox-thumb\" width=\"784\" data-original=\"https://picx.zhimg.com/v2-9ec230434128e818fdb83f713f9a0562_r.jpg?source=2c26e567\"/></noscript><img src=\"data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;784&#39; height=&#39;442&#39;&gt;&lt;/svg&gt;\" alt=\"\" data-rawwidth=\"784\" data-rawheight=\"442\" data-original-token=\"v2-9ec230434128e818fdb83f713f9a0562\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"784\" data-original=\"https://picx.zhimg.com/v2-9ec230434128e818fdb83f713f9a0562_r.jpg?source=2c26e567\" data-actualsrc=\"https://pic1.zhimg.com/50/v2-9ec230434128e818fdb83f713f9a0562_720w.jpg?source=2c26e567\"/></figure>\n<p>哪怕是最小的壁橱，他也全都打开检查了一遍。还是无果。</p>\n<p>真他妈见鬼了啊……</p>\n<p>詹姆斯满心疑虑地走进一楼的卫生间，放冷水洗了把脸，想让自己清醒一下。</p>\n<p>就在他抬起头，望向镜子时，他发现了一丝异样。</p>\n<p>镜子反射的，是卫生间对面洗衣房的门。</p>\n<p>透过门上的毛玻璃窗户，能隐约看到……一个黑黢黢的人影。</p>\n<p>那个人似乎隔着毛玻璃，在洗衣房里注视着自己。</p>\n<p>一动不动。</p>\n<figure><noscript><img src=\"https://picx.zhimg.com/50/v2-d893e305ae4a12e56d5fd261fb29e2b7_720w.jpg?source=2c26e567\" alt=\"\" data-rawwidth=\"1271\" data-rawheight=\"713\" data-original-token=\"v2-d893e305ae4a12e56d5fd261fb29e2b7\" class=\"origin_image zh-lightbox-thumb\" width=\"1271\" data-original=\"https://pica.zhimg.com/v2-d893e305ae4a12e56d5fd261fb29e2b7_r.jpg?source=2c26e567\"/></noscript><img src=\"data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;1271&#39; height=&#39;713&#39;&gt;&lt;/svg&gt;\" alt=\"\" data-rawwidth=\"1271\" data-rawheight=\"713\" data-original-token=\"v2-d893e305ae4a12e56d5fd261fb29e2b7\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"1271\" data-original=\"https://pica.zhimg.com/v2-d893e305ae4a12e56d5fd261fb29e2b7_r.jpg?source=2c26e567\" data-actualsrc=\"https://picx.zhimg.com/50/v2-d893e305ae4a12e56d5fd261fb29e2b7_720w.jpg?source=2c26e567\"/></figure>\n<p><br/>\n詹姆斯立马转身望去，窗后人影居然倏地消失了。</p>\n<p>还伴随着一阵悉悉索索的响动。</p>\n<p>「是谁，给老子滚出来！」</p>\n<p>詹姆斯毫不迟疑抽出了枪，对准了洗衣房的门。</p>\n<p>时间都仿佛凝固了。</p>\n<p>等了十来秒，没有动静。</p>\n<p>他憋不住了，端枪就冲进了洗衣房，令他震惊的是，里面居然还是没有人。</p>\n<p>没有人。莫非真的是鬼吗？</p>\n<p>詹姆斯四下检查了一遍，真的没人。</p>\n<p>这么堪称灵异的事件，他生平还头一次碰上。</p>\n<p>这天后半夜，詹姆斯带着妻子在俩儿子房间打了地铺，锁死了门。</p>\n<p>他守在门边，隔一阵子就警醒一次。</p>\n<p>好在，总算是平安无事。</p>\n<p>第二天，他们开了个家庭会议。</p>\n<p>夫妻俩这才从儿子们那里，得知了一些之前不知道的情况：</p>\n<p>原来，孩子们之前就发现，有些东西会突然消失几天，然后又突然出现。</p>\n<p>比如小儿子的乐高玩具，某天就不见了。</p>\n<p>过了半周，它又出现在了床头，还被搭成了另外的样子。</p>\n<p>「我的 Switch 也是，再次出现时，里面的游戏都被删了。」</p>\n<p>大儿子也补充道，他当时还以为是弟弟的恶作剧，俩人为此吵了一架。</p>\n<p>「不对劲……太不对劲了。」</p>\n<p>夫妻俩越听越觉得恐怖。</p>\n<p>他们越来越确定，这个家里必然有其他人在。</p>\n<p>但他们死活整不明白：这个人是怎么做到「隐身」，还能跟一家人共同生活的？</p>\n<p>这个新家虽说挺大，但要藏一个大活人，完全不被发现，那还真的不容易。</p>\n<p>更细思极恐的是，这个人的目的究竟是什么呢？</p>\n<p>他既不图财，目前为止，也没有展露什么暴力意图。</p>\n<p>感觉就像一个寄生在人家的幽灵，随时盯住一家人的一举一动。</p>\n<p>这种动机的未知，更让人无比恐惧。</p>\n<p>「不成，这问题不解决，我一天都住不下去。」</p>\n<p>坎贝尔的声音都快带着哭腔了。</p>\n<p>詹姆斯点了点头，他也觉得事态有点严重了。</p>\n<p>但他始终没有做一件事：报警。</p>\n<p>或许在他看来，一个海军大兵不该屁大点事就找警察，他觉得自己完全能处理。</p>\n<p>不过，他也不敢拿孩子的安全开玩笑。思来想去，他想到一个解决方案：</p>\n<p>先带着全家人，飞去加州的父母家，小住几天。</p>\n<p>等监控到货了，再回来。</p>\n<p>当天上午，他便向部队请了休假，一家四口离开了这个闹鬼的房子。</p>\n<p>一周后，装监控的人通知货到，随时可以上门。</p>\n<p>放松许久的全家人，也调整了心情，飞回了檀香山。</p>\n<p>从机场取了车，一家人有说有笑开到家门口时，已经是晚上 10 点多了。</p>\n<p>汽车沿着山坡环绕，一片昏黄的灯光下，自家房子的轮廓出现在前窗视野中。</p>\n<p>可这一幕，非但没有家的温馨，反而催生出强烈的不安感，笼罩着一家人。</p>\n",
          "has_purchased": false
        }
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3330921827}",
      "attached_info": "CqIFCJ7qm4COqI6nmwEQBBoJNjM1NzAwNjgwIKudhKwGKKYnMD1AEEoqCh9UU19TT1VSQ0VfRkVFRFJFX1BBSURfSE9VUkxZX1YyEgEwGAAgADoAWgg3ODEzNjc5OGIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjMzMzA5MjE4MjeKAQk1MjEzNDc2MTCqAQlyZWNvbW1lbmTCASBiNGYxMDMzMDE1NjY1NjUxYzkzYWJhODBhYzA0ZmFhNvIBCAgMEgRQYWlk8gEoCAoSJDhjM2M4NDdiLWFmODgtNDlkNC1hNWYyLWQ1NmQxODZhYzAyYvIBBQgLEgEz8gEOCAISClBhaWRBbnN3ZXKCAgCIAuOg6piNMpICIGI0ZjEwMzMwMTU2NjU2NTFjOTNhYmE4MGFjMDRmYWE2mgIAygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxlygIOQ3VycmVuY3lSYW5rZXLKAg5zbG90SW5zZXJ0UnVsZdoCH1RTX1NPVVJDRV9GRUVEUkVfUEFJRF9IT1VSTFlfVjLoAgL6AgtOT1JNQUxfRkxPV4oDIGM2NzY5YmI0YTVkMDQyMDdiMTFiMmE2YmRlZDkzYTNimgMNCgJ2MBAAGgVvdGhlcqgDnI9P2AMA+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAYgEAJIEBFBhaWSaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTcwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQnxOAuo2tkPoEFGXr1OY7gFUCJBfn1/Hxpn6Q/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFfjCXI2tzsT7QBQDgBQDoBQDwBQOQBgCSAiUKCTYzNTcwMDY4MBIKMzMzMDkyMTgyNxgEIgpJTUFHRV9URVhU",
      "action_card": false
    }, {
      "id": "17_1721528651.986",
      "type": "feed",
      "offset": 17,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528651,
      "updated_time": 1721528651,
      "target": {
        "id": 3345584173,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3345584173",
        "author": {
          "id": "18ea878ae8d2433ba2e2fa849cf4f464",
          "url": "https://api.zhihu.com/people/18ea878ae8d2433ba2e2fa849cf4f464",
          "user_type": "people",
          "url_token": "wen-fu-79",
          "name": "文富",
          "headline": "好奇",
          "avatar_url": "https://pica.zhimg.com/50/acc55a28066e74b0b5856ac6ee52a3af_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 1407,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1704075418,
        "updated_time": 1704075418,
        "voteup_count": 28170,
        "thanks_count": 3499,
        "comment_count": 442,
        "is_copyable": false,
        "question": {
          "id": 622527987,
          "type": "question",
          "url": "https://api.zhihu.com/questions/622527987",
          "author": {
            "id": "f5f421e4d9a759d5602c37e62fbb5776",
            "url": "https://api.zhihu.com/people/f5f421e4d9a759d5602c37e62fbb5776",
            "user_type": "people",
            "url_token": "52-42-49-69-23",
            "name": "太空杀文哥",
            "headline": "",
            "avatar_url": "https://picx.zhimg.com/50/v2-afa0086e0c991693efa3129b68d72740_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 32,
            "is_following": false,
            "is_followed": false
          },
          "title": "双胞胎为什么要穿得一模一样，目的何在？",
          "created": 1694988262,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 103,
          "bound_topic_ids": [1395, 1938, 183255],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "评论区看见的，笑死我了。   分享快乐。 如有冒犯，删。",
        "excerpt_new": "评论区看见的，笑死我了。   分享快乐。 如有冒犯，删。",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "disallowed",
        "content": "<p data-pid=\"EQZcRCbV\">评论区看见的，笑死我了。</p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-e341b73f9f0c1b2e398c14ba42e4ee4c_b.jpg\" data-rawwidth=\"1176\" data-rawheight=\"609\" data-size=\"normal\" data-original-token=\"v2-b259efdccc3a364b8c693d103ddce610\" data-default-watermark-src=\"https://pic1.zhimg.com/v2-b177dd0b990b75c37bd2f0d21d2b12e2_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"1176\" data-original=\"https://pic1.zhimg.com/v2-e341b73f9f0c1b2e398c14ba42e4ee4c_r.jpg\"/></figure><p data-pid=\"Oscex7JU\">分享快乐。</p><p data-pid=\"NDrZ7DXv\">如有冒犯，删。</p><p></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 3524809,
        "favorite_count": 1054,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3345584173}",
      "attached_info": "Co4FCJ7qm4COqI6nmwEQBBoJNjM4MzY1NDkzIJrByKwGKIrcATC6A0ARSigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9WgkxMDA2MTg5NjRiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgozMzQ1NTg0MTczigEJNjIyNTI3OTg3qgEJcmVjb21tZW5kwgEgMThlYTg3OGFlOGQyNDMzYmEyZTJmYTg0OWNmNGY0NjTyAQoIDBIGTm9ybWFs8gEoCAoSJGJjMDIzMDUzLTYzYTEtNGNhYS1iNjcyLWY3Yzg1MWYxMDllMPIBBQgLEgEzggIAiALjoOqYjTKSAiAxOGVhODc4YWU4ZDI0MzNiYTJlMmZhODQ5Y2Y0ZjQ2NJoCAMoCG09sZENvbnRlbnRSZWR1Y2U1V2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y46AIC+gILTk9STUFMX0ZMT1eKAyBjNjc2OWJiNGE1ZDA0MjA3YjExYjJhNmJkZWQ5M2EzYpoDDQoCdjAQABoFb3RoZXKoA8mR1wHYAwDqAwlmZWVkcmVfdjj6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAzE2MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAIKdgwj+BBQAAAAAAAAAAiQX59fx8aZ+kP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUDkAYAkgIlCgk2MzgzNjU0OTMSCjMzNDU1ODQxNzMYBCIKSU1BR0VfVEVYVA==",
      "action_card": false
    }];
    const list3 = [{
      "id": "18_1721528757.281",
      "type": "feed",
      "offset": 18,
      "verb": "TOPIC_ACKNOWLEDGED_ARTICLE",
      "created_time": 1721528757,
      "updated_time": 1721528757,
      "target": {
        "id": 572490725,
        "type": "article",
        "url": "https://api.zhihu.com/articles/572490725",
        "author": {
          "id": "1a8cf4344175c4bb8dba837b731a3074",
          "url": "https://api.zhihu.com/people/1a8cf4344175c4bb8dba837b731a3074",
          "user_type": "people",
          "url_token": "wei-xin-yong-hu-93-75-82",
          "name": "完美种子酱",
          "headline": "【完美世界教育】游戏产业公司实战教学，更懂行业需求",
          "avatar_url": "https://pic1.zhimg.com/50/v2-a85eaa02b199d8aac03b544acc8b49df_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 0,
          "followers_count": 3269,
          "is_following": false,
          "is_followed": false
        },
        "title": "完美世界多款新游将陆续推出，你最期待哪款游戏？",
        "comment_permission": "all",
        "created": 1665562880,
        "updated": 1721287674,
        "voteup_count": 353,
        "voting": 0,
        "comment_count": 59,
        "linkbox": {
          "category": "",
          "pic": "",
          "title": "",
          "url": ""
        },
        "excerpt": "就业方向：系统策划、数值策划、关卡策划等策划岗位游戏原画课程：分为角色原画和场景原画，系统学习6个月，面向有绘画基础且想成为职业原画师的人才！游戏建模课程：线下",
        "excerpt_new": "就业方向：系统策划、数值策划、关卡策划等策划岗位游戏原画课程：分为角色原画和场景原画，系统学习6个月，面向有绘画基础且想成为职业原画师的人才！游戏建模课程：线下",
        "preview_type": "default",
        "preview_text": "",
        "column": {
          "id": "c_1562856103481999360",
          "type": "column",
          "url": "https://api.zhihu.com/columns/c_1562856103481999360",
          "author": {
            "id": "",
            "url": "",
            "user_type": "people",
            "url_token": "",
            "name": "匿名用户",
            "headline": "",
            "avatar_url": "https://picx.zhimg.com/v2-d41c2ceaed8f51999522f903672a521f_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 0,
            "is_following": false,
            "is_followed": false
          },
          "title": "完美世界教育-游戏设计课程",
          "imageUrl": "https://pic1.zhimg.com/4b70deef7_720w.jpg?source=d16d100b",
          "comment_permission": "private",
          "intro": "游戏行业自己的人才培训基地",
          "updated": 1665469398,
          "is_following": false
        },
        "content": "<p data-pid=\"dsuEBNxx\"><b>今年上半年最大的节奏应该就是游戏行业不行了</b></p><p data-pid=\"Pm9M7N1D\">无可厚非，整个行业是有那么一段相对低谷的时间，但并不意味着未来这个行业不会自我迭代和进化，中国游戏行业依旧有原创和精品的种子。</p><p data-pid=\"XXNKL0e8\">我始终坚信我们想要的未来一定会到来，这也是我一直热爱这个行业的原因。</p><p data-pid=\"DupVm2Ns\">即便抛开游戏行业不谈，影视、动漫等行业人才画像和游戏行业也是有极高匹配度，拿完美世界教育目前开设的游戏设计类课程举例，现阶段开设了包括<b>【游戏策划、原画、3D建模、游戏动作、游戏特效、游戏UI、UE虚幻引擎】等七项大课</b>。</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-6ab0970155573ede271a3b8c02e6a559_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"720\" data-rawheight=\"318\" data-original-token=\"v2-6ab0970155573ede271a3b8c02e6a559\" class=\"origin_image zh-lightbox-thumb\" width=\"720\" data-original=\"https://picx.zhimg.com/v2-6ab0970155573ede271a3b8c02e6a559_r.jpg\"/></figure><p data-pid=\"DyHG4HhG\">可从事职业方向有: <b>插画师、平面设计师、原画设计师、游戏动作师、影视动画师、3D动画师、影视后期、动画制作、VR/AR设计、空间设计师、策划师、儿童教育、栏目包装、建筑漫游</b>等，有极高的行业宽度和岗位广度。</p><p data-pid=\"znCfMG1n\">且当前影游行业正逐步向精品化方向发展，一线大厂愈加重视产品本身的品质，加大精英人才储备与培养，游戏策划、影游设计师等相关职业成为炙手可热的高收入职业。</p><p data-pid=\"KSmaBemJ\">这也是完美世界教育在开设课程时始终会考虑的点，即就业前景，因为<b>本身就是产业公司出生，从产业中来也具备更高的行业嗅觉。</b></p><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-5e4e557cc0cdd7470e754dc1b170c7ff_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1549\" data-rawheight=\"508\" data-original-token=\"v2-5e4e557cc0cdd7470e754dc1b170c7ff\" class=\"origin_image zh-lightbox-thumb\" width=\"1549\" data-original=\"https://pic2.zhimg.com/v2-5e4e557cc0cdd7470e754dc1b170c7ff_r.jpg\"/></figure><h2>一、关于完美世界教育</h2><p data-pid=\"RasLTIFf\"><b>完美世界教育</b>是<b>完美世界控股集团</b>业务板块之一，成立初期本是完美世界内训平台，依托集团优势产业资源，经过大量的实战课程后，根据<b>市场用人需求，</b>研发出一整套游戏设计课程。</p><p data-pid=\"UuoayBuu\">授课老师有<b>大型项目研发经验，来自产业，身在产业，</b>致力于为<b>游戏、影视、动漫</b>等行业培养<b>专业高精人才</b>。</p><a data-draft-node=\"block\" data-draft-type=\"ad-link-card\" data-ad-id=\"Plugin_f419e21f230cb47fc348fd5683652ca7\"></a><h2>二、关于学员福利</h2><p data-pid=\"iKOVg5K_\">①能参与<b>无边界课堂</b>，会带大家走出学校，去接触一些与专业相关或是提高审美的课程内容~</p><p data-pid=\"V0q7ECHl\">②不定期参与<b>游戏企业内部知识分享</b>，与游戏大佬面对面</p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-cdd4b52b5fd90ad02033724d81b289ef_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1742\" data-rawheight=\"160\" data-original-token=\"v2-cdd4b52b5fd90ad02033724d81b289ef\" class=\"origin_image zh-lightbox-thumb\" width=\"1742\" data-original=\"https://pic4.zhimg.com/v2-cdd4b52b5fd90ad02033724d81b289ef_r.jpg\"/></figure><p data-pid=\"JHhMYWO_\">③举办游戏社团，比如<b>桌游社团</b>，会有各大游戏公司项目组大佬参与哦，既可以<b>锻炼游戏思维</b>还可以直接接触一线游戏从业者，<b>拓展人脉圈</b>！</p><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-92b995c99b5c14542a6bbe169b96d0ea_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"934\" data-rawheight=\"200\" data-original-token=\"v2-92b995c99b5c14542a6bbe169b96d0ea\" class=\"origin_image zh-lightbox-thumb\" width=\"934\" data-original=\"https://pica.zhimg.com/v2-92b995c99b5c14542a6bbe169b96d0ea_r.jpg\"/></figure><h2><b>三、校区地址</b></h2><p data-pid=\"A7r9qS5M\"><b>北京：</b>北京市朝阳区-完美世界大厦</p><p data-pid=\"mE38Ekfj\"><b>成都：</b>成都市成华区-完美文创公园</p><p data-pid=\"DoT8wWv8\"><b>德清：</b>湖州市德清县-完美创新创业产业园</p><h2>四、超全课程介绍</h2><h3><b>1、UE虚幻引擎课程：</b></h3><p data-pid=\"HdI7HNDv\">线下6个月，偏美术方向，无需接触深度编程，会讲蓝图。不会美术的程序员不是一个好的TA！</p><p data-pid=\"zVspQQTd\"><b>就业方向：UE场景美术师、材质灯光师、UE4地编师、虚拟直播布景师、关卡地图设计师......</b></p><a href=\"https://xg.zhihu.com/plugin/878757634368de824281f3d6c3d42aee?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">【UE虚幻引擎全能实战班】掌握UE技能高薪行业任你选，戳这里了解课程</a><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-d1d16e38e57c5731ca751dec3b0d4b00_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1278\" data-rawheight=\"561\" data-original-token=\"v2-d1d16e38e57c5731ca751dec3b0d4b00\" class=\"origin_image zh-lightbox-thumb\" width=\"1278\" data-original=\"https://pica.zhimg.com/v2-d1d16e38e57c5731ca751dec3b0d4b00_r.jpg\"/></figure><h3><b>2、策划课程：</b></h3><p data-pid=\"wZdUxGVA\">（授课老师曾是项目组<b>主策</b>哦）线下6个月，面向想进入游戏行业，从事游戏开发设计工作的人才</p><p data-pid=\"9o5t8a4s\"><b>就业方向：系统策划、数值策划、关卡策划等策划岗位</b></p><a href=\"https://xg.zhihu.com/plugin/2754f549c0588a494fa08bb90f977fa4?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">【游戏策划课程】游戏公司内训-大厂主策亲自授课，点这里查看课程详情</a><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-67f1bd35801b97f37d3df52c93cabd21_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1385\" data-rawheight=\"522\" data-original-token=\"v2-67f1bd35801b97f37d3df52c93cabd21\" class=\"origin_image zh-lightbox-thumb\" width=\"1385\" data-original=\"https://pic2.zhimg.com/v2-67f1bd35801b97f37d3df52c93cabd21_r.jpg\"/></figure><h3><b>3、原画课程：</b></h3><p data-pid=\"wvH_7i3L\">分为<u>角色原画</u>和<u>场景原画</u>，系统学习6个月，面向<b>有绘画基础</b>且想成为职业原画师的人才！</p><p data-pid=\"XBKlyMu1\"><b>就业方向：插画师、平面设计师、原画设计师</b></p><a href=\"https://xg.zhihu.com/plugin/040a1e8af6763cacdaf00ccd33064f5c?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">【角色原画课程】学游戏原画就来游戏公司学-助力成为自由多金的原画师</a><a href=\"https://xg.zhihu.com/plugin/7848963d4afe56079302e8b133a1a0a6?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">【场景原画课程】在实战项目中沉浸式提升，毕业即被企业抢订</a><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-11626dc3a499467daed3c6f770b9ff3c_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1298\" data-rawheight=\"730\" data-original-token=\"v2-11626dc3a499467daed3c6f770b9ff3c\" class=\"origin_image zh-lightbox-thumb\" width=\"1298\" data-original=\"https://pic1.zhimg.com/v2-11626dc3a499467daed3c6f770b9ff3c_r.jpg\"/></figure><h3><b>4、3D建模课程：</b></h3><p data-pid=\"v5_XPGLE\">线下6个月，分为3d角色和3d场景，热门行业哦，目前<b>元宇宙场景搭建</b>很缺人才！主要用到的软件有：<b>3D Max、Maya、Zbrush，</b>没有美术和软件基础也能学！</p><p data-pid=\"I7MVl2ki\"><b>就业方向：游戏角色建模、游戏场景建模、手办建模、影视动画建模</b></p><a href=\"https://xg.zhihu.com/plugin/7148f94daa257af154d3dcdaabd0b7ba?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\"><span class=\"invisible\">https://</span><span class=\"visible\">xg.zhihu.com/plugin/714</span><span class=\"invisible\">8f94daa257af154d3dcdaabd0b7ba?BIZ=ECOMMERCE</span><span class=\"ellipsis\"></span></a><a href=\"https://xg.zhihu.com/plugin/ab2996bf068860ca6f986e5f095c8424?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">【3d角色课程】集20年产业经验-我们更懂如何教你做游戏</a><a href=\"https://xg.zhihu.com/plugin/e50e8acfa01645414cd8a9f63820f366?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">【3d场景课程】强大师资阵容带你从零级玩家进阶技能大神，查看课程详情</a><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-c4e07d403cc83e4046b70f79e37e7a3f_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"912\" data-rawheight=\"396\" data-original-token=\"v2-c4e07d403cc83e4046b70f79e37e7a3f\" class=\"origin_image zh-lightbox-thumb\" width=\"912\" data-original=\"https://pic2.zhimg.com/v2-c4e07d403cc83e4046b70f79e37e7a3f_r.jpg\"/></figure><h3><b>5、游戏特效课程：</b></h3><p data-pid=\"w3VIGIYH\">线下6个月，游戏特效设计师入行起薪高，薪资涨幅大，公司待遇十分优厚！</p><p data-pid=\"tiHp618m\"><b>就业方向：游戏特效设计师、短视频特效制作、动画特效制作、AR/VR项目特效师</b></p><a href=\"https://xg.zhihu.com/plugin/436dfd8514fb4a588f0666b1e2af48e3?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">【游戏特效课程】学游戏特效就来游戏公司学！戳这里查看详情</a><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-16a41df9b28aa7d3ad1004f931320f2a_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"936\" data-rawheight=\"662\" data-original-token=\"v2-16a41df9b28aa7d3ad1004f931320f2a\" class=\"origin_image zh-lightbox-thumb\" width=\"936\" data-original=\"https://pic3.zhimg.com/v2-16a41df9b28aa7d3ad1004f931320f2a_r.jpg\"/></figure><p data-pid=\"-OeoBhmN\">以上是完美世界教育自研课程的介绍，有关<b>课程大纲</b>及<b>学员作品</b>等信息，文中穿插的官网链接中都有介绍哦，</p><p data-pid=\"WKOT6lQc\">有想了解更多的可以<b>私信</b>我，或者在上方课程链接中<b>直接咨询</b>我们老师~</p><p></p>",
        "is_labeled": false,
        "visited_count": 154090,
        "thumbnails": ["https://pic1.zhimg.com/50/v2-0ed744b41af980563b850ea42a3c3442_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-823bca38d9e342d1b5e8876ed063f375_720w.jpg?source=b6762063"],
        "favorite_count": 1641
      },
      "brief": "{\"source\": \"TS\", \"type\": \"article\", \"id\": 572490725}",
      "attached_info": "CswFCIGsh+Oi3pC7nAEQBxoJMjE1MzUzNDA2IIDymZoGKOECMDtAEkoZCg5Qcm9tb3Rpb25FeHRyYRIBMBgAIAA6AFoIMTMxMDc0MDhiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgk1NzI0OTA3MjWKARVjXzE1NjI4NTYxMDM0ODE5OTkzNjCqAQlyZWNvbW1lbmTCASAxYThjZjQzNDQxNzVjNGJiOGRiYTgzN2I3MzFhMzA3NPIBCQgMEgVaUGx1c/IBKAgJEiQ0NjlhODhkZC0yY2IzLTRjMzEtODFlNi1mYmI2MTAyZGFjZTHyASgIChIkMjU5MWJiZDEtN2EyOS00NTRhLThjYjYtOWM5NTQwMWU5NDkx8gEFCAsSATTyAQgICBIEdHJ1ZYICAIgC4tfwmI0ykgIgMWE4Y2Y0MzQ0MTc1YzRiYjhkYmE4MzdiNzMxYTMwNzSaAgDKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhdacGx1c0dyU2NvcmVXZWlnaHRSdWxlMcoCDkN1cnJlbmN5UmFua2VyygIOc2xvdEluc2VydFJ1bGXaAg5Qcm9tb3Rpb25FeHRyYegCA/oCC05PUk1BTF9GTE9XigMgYjhhMTI0NjE5OTQwNGYwNTlkNTljOTMyZGJmOWE2YmSaAw0KAnYwEAAaBW90aGVyqAPqswnYAwD6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQBiAQAkgQFWlBsdXOaBAEzoAQAqAQAsAQAugQGbWFudWFswgQDMTU1yAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAAAAOoGpP4EFAAAATDErS0CJBUwMvz+/f6k/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkF7u7cpF+zIkDQBQDgBQDoBQDwBQSQBgCSAiQKCTIxNTM1MzQwNhIJNTcyNDkwNzI1GAciCklNQUdFX1RFWFQ=",
      "action_card": false,
      "promotion_extra": "{\"is_card\":true,\"id\":\"3047241\",\"topstory_info\":\"bid=129.96423577917017&pctr=0.021562427282333374&price=0&pv_id=469a88dd-2cb3-4c31-81e6-fbb6102dace1\",\"parameters\":\"plugcb=https%3A%2F%2Fsugar.zhihu.com%2Fplutus_adreaper_callback%3Fcid%3D3047241%26ccid%3D1234795%26zoneid%3D10012%26adid%3D3115310%26sid%3D469a88dd-2cb3-4c31-81e6-fbb6102dace1%26adsource%3Dzhi_plus%26ocpxs%3D1%26ocpxp%3D3000%26dynamictitle%3D1747983312210350081%26mixinfo%3D__MIX__INFO__%26campaignid%3D2161226%26cbed%3DCCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ%3D%3D%26cmixid%3D%26cmixvs%3D%26isnative%3Dfalse\",\"sign\":\"e69a0c96-902d-47ba-891f-1f622576ec72\",\"mobile_experiment\":null,\"new_asset\":\"\",\"click_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mcdti=1747983312210350081&cl=&zk=&cv=&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mix=__MIX__INFO__&zpluspt=0&mcdtt=1&pt=3&cmi=&dts=1721528756&iti=__IS_THREE_IMAGE__&ui=60.255.228.141&cmv=&isy=__IMAGE_STYLE__&hp=0&tev=0&cc=510600&ed=CCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ==&cla=3&ar=0.049814045429229736&zri=-7172471748646808063&zpt=&at=CjEEKVQqOSuIYIdBvEo7Wg==\"],\"view_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mcdti=1747983312210350081&cl=&zk=&cv=&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mix=__MIX__INFO__&zpluspt=0&mcdtt=1&pt=3&cmi=&dts=1721528756&iti=__IS_THREE_IMAGE__&ui=60.255.228.141&cmv=&isy=__IMAGE_STYLE__&hp=0&tev=0&cc=510600&ed=CCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ==&cla=3&ar=0.049814045429229736&zri=-7172471748646808063&zpt=&at=CjEEPFEmLWm8-o_znDYB\"],\"view_x_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mcdti=1747983312210350081&cl=&zk=&cv=&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mix=__MIX__INFO__&zpluspt=0&mcdtt=1&pt=3&cmi=&dts=1721528756&iti=__IS_THREE_IMAGE__&ui=60.255.228.141&cmv=&isy=__IMAGE_STYLE__&hp=0&tev=0&cc=510600&ed=CCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ==&cla=3&ar=0.049814045429229736&zri=-7172471748646808063&zpt=&at=CjEEPFEmLR820zpS4V8L1jE=\"],\"deliver_x_tracks\":[\"http://proxy-ad-track-zplus:10000/ad-track/zplus_log?mcdti=1747983312210350081&cl=&zk=&cv=&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mix=__MIX__INFO__&zpluspt=0&mcdtt=1&pt=3&cmi=&dts=1721528756&iti=__IS_THREE_IMAGE__&ui=60.255.228.141&cmv=&isy=__IMAGE_STYLE__&hp=0&tev=0&cc=510600&ed=CCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ==&cla=3&ar=0.049814045429229736&zri=-7172471748646808063&zpt=&at=CjEELl0vMzYrVw0fll1t8qj4XUE=\"],\"impression_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mcdti=1747983312210350081&cl=&zk=&cv=&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mix=__MIX__INFO__&zpluspt=0&mcdtt=1&pt=3&cmi=&dts=1721528756&iti=__IS_THREE_IMAGE__&ui=60.255.228.141&cmv=&isy=__IMAGE_STYLE__&hp=0&tev=0&cc=510600&ed=CCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ==&cla=3&ar=0.049814045429229736&zri=-7172471748646808063&zpt=&at=CjEEI1UzKCU9VjsIXwyIzIulhGWC\"],\"conversion_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mcdti=1747983312210350081&cl=&zk=&cv=&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mix=__MIX__INFO__&zpluspt=0&mcdtt=1&pt=3&cmi=&dts=1721528756&iti=__IS_THREE_IMAGE__&ui=60.255.228.141&cmv=&isy=__IMAGE_STYLE__&hp=0&tev=0&cc=510600&ed=CCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ==&cla=3&ar=0.049814045429229736&zri=-7172471748646808063&zpt=&at=CjEEKVctLCU8VjsIX1u2KBLeP1SB\"],\"topstory_tracks\":[\"http://proxy-ad-track-zplus-bid:10000/ad-track/zplus/bid?mcdti=1747983312210350081&cl=&zk=&cv=&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mix=__MIX__INFO__&zpluspt=0&mcdtt=1&pt=3&cmi=&dts=1721528756&iti=__IS_THREE_IMAGE__&ui=60.255.228.141&cmv=&isy=__IMAGE_STYLE__&hp=0&tev=0&cc=510600&ed=CCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ==&cla=3&ar=0.049814045429229736&zri=-7172471748646808063&zpt=&at=CjEELF0mPh8nSzQIRYVahjjLuoY=&rki=__RANK__INFO__&fri=__FILTER__INFO__&fin=1\"],\"video_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mcdti=1747983312210350081&cl=&zk=&cv=&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mix=__MIX__INFO__&zpluspt=0&mcdtt=1&pt=3&cmi=&dts=1721528756&iti=__IS_THREE_IMAGE__&ui=60.255.228.141&cmv=&isy=__IMAGE_STYLE__&hp=0&tev=0&cc=510600&ed=CCpNdw1lKjInF29WBGJ5CVNjWCMFcGtxexZjVxczOElWNVY5TGU5KXMXY1ICZX8EW3MfL1szOTNzFXQUXm1-Fg8mTzgFc3RwfhViVwFlegBccgh-Dntpd38cZFAJdjZABzBKOkx-amYvVzlaAHY_WQZ4FHsAcWpxfhNgVAdleAZcdw57CXp8KSlWb1cXMy1ZVncIfAlxaHZoRz0IRTkoDVtjSzpKKmd5dxxkUhcxNllWdAl6CXF8KS0YY0FTIHEFX2sKeQ93bnF3F2NVAmR9A00mXT5RfmhxexZnVAVgehYIIU05BXJ8MycYZlEIMXQIDyEUeFshaW16RmFWHGh9VV1oXyhadWtwfEEzBFRhalMHNgRsWywpfXsWfFAIZHwGXHAJeAhxa3d3AyEXRDkoQ1ZjVilOMWdwYBVjXwBhfgRTdQ9-CHdrcX0SZUFSJHEBWXYNfQF2fDUnS29WAWB8AVt1DHkeLDkwNlVvVAFgfBYILVt3CGU1Iz5dIVoAdi9RBXhfK1QwP2YrRiIERW18Fhs3UHcJc2hyfB1gQUcqJQ1bY1YpSDs9Ly9Jb1YEdi1SG3gJbE4hLn1-AzMBUDNxFVwHHHgKITUvOgBgVRRjDQFOd3pvCnE5Lz1RDQFQMzhfGWALeB1wG3FrFxFCA2IpUxsmHHgKZmkBfwBgJBRiflwfNxx4CmZpAX4LYlcEY3wCWXAJeQB2aHh6EWBTFGIPFVl3VT5KHDYvKUwmQgNiaQMqaAxkCnBuc34TalYDYnQGWHIObwoAf3J8SjEXUg8uVk53C28LAmtlfGZ3VQMnKVkMLU0vXBw8IS1RPRUUYn4VWAQIbw8HfCM8TG9UAWR7Al90HylcNy59fgMzEVhteQZScgp6Hi8vKXMcZlcAZ30HWHFMoHw28pyAzQ==&cla=3&ar=0.049814045429229736&zri=-7172471748646808063&zpt=&at=CjEEPFEnPy8RVT4GSP2lJbJWhW_G\"],\"video_play_tracks\":null,\"debug_tracks\":null,\"view_as_click_tm\":5}"
    }, {
      "id": "19_1721528757.716",
      "type": "feed",
      "offset": 19,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528757,
      "updated_time": 1721528757,
      "target": {
        "id": 2700374739,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/2700374739",
        "author": {
          "id": "b4bddc2da6b6a502fbe806a87a270e9c",
          "url": "https://api.zhihu.com/people/b4bddc2da6b6a502fbe806a87a270e9c",
          "user_type": "people",
          "url_token": "xl-73",
          "name": "林曦XL",
          "headline": "花开须折直须折。",
          "avatar_url": "https://pica.zhimg.com/50/v2-090a25872a2fe0b56e0314568a7714a1_l.jpg?source=b6762063",
          "is_org": false,
          "gender": -1,
          "followers_count": 894,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1664812110,
        "updated_time": 1664812110,
        "voteup_count": 51120,
        "thanks_count": 4333,
        "comment_count": 1545,
        "is_copyable": true,
        "question": {
          "id": 335576615,
          "type": "question",
          "url": "https://api.zhihu.com/questions/335576615",
          "author": {
            "id": "9be0e6ef9fcd1fa7b1655ab5225fb0ca",
            "url": "https://api.zhihu.com/people/9be0e6ef9fcd1fa7b1655ab5225fb0ca",
            "user_type": "people",
            "url_token": "zone-29-7",
            "name": "Zone·Cheung",
            "headline": "网络销售",
            "avatar_url": "https://picx.zhimg.com/50/v2-23877b4250eb496961595dcd2198e786_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 0,
            "is_following": false,
            "is_followed": false
          },
          "title": "为什么《猫和老鼠》被称为经典，而《喜羊羊与灰太狼》会被很多人说弱智？",
          "created": 1563433259,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 365,
          "bound_topic_ids": [13061, 35696, 227972],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "史上第一动漫的含金量，一图胜千言。",
        "excerpt_new": "史上第一动漫的含金量，一图胜千言。",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"aohpseYg\">史上第一动漫的含金量，一图胜千言。</p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-4a7a102d398f29b637330e61d0c91272_b.gif\" data-rawwidth=\"182\" data-rawheight=\"240\" data-size=\"normal\" data-original-token=\"v2-4a7a102d398f29b637330e61d0c91272\" data-thumbnail=\"https://pic1.zhimg.com/v2-4a7a102d398f29b637330e61d0c91272_b.jpg\" class=\"content_image\" width=\"182\"/></figure><p></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 5924477,
        "favorite_count": 3132,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 2700374739}",
      "attached_info": "Co0FCIGsh+Oi3pC7nAEQBBoJNTIxMDYzMDk3IM6I7JkGKLCPAzCJDEATSigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9WggzNjg0OTczNWIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjI3MDAzNzQ3MzmKAQkzMzU1NzY2MTWqAQlyZWNvbW1lbmTCASBiNGJkZGMyZGE2YjZhNTAyZmJlODA2YTg3YTI3MGU5Y/IBCggMEgZOb3JtYWzyASgIChIkYzA0YWY1OTgtYjA3NC00ZmM2LTllZjctZmU5ZDI2ZjFlN2Y48gEFCAsSATSCAgCIAuLX8JiNMpICIGI0YmRkYzJkYTZiNmE1MDJmYmU4MDZhODdhMjcwZTljmgIAygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxlygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCE1RTX1NPVVJDRV9GRUVEUkVfVjjoAgL6AgtOT1JNQUxfRkxPV4oDIGI4YTEyNDYxOTk0MDRmMDU5ZDU5YzkzMmRiZjlhNmJkmgMNCgJ2MBAAGgVvdGhlcqgD/czpAtgDAOoDCWZlZWRyZV92OPoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAACAm13CP4EFAAAAAAAAAACJBUwMvz+/f6k/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQSQBgCSAiUKCTUyMTA2MzA5NxIKMjcwMDM3NDczORgEIgpJTUFHRV9URVhU",
      "action_card": false
    }, {
      "id": "20_1721528757.288",
      "type": "feed",
      "offset": 20,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528757,
      "updated_time": 1721528757,
      "target": {
        "id": 3539131116,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3539131116",
        "author": {
          "id": "c46b1e62f2d2b213107feceba64de346",
          "url": "https://api.zhihu.com/people/c46b1e62f2d2b213107feceba64de346",
          "user_type": "people",
          "url_token": "you-you-25-72-2",
          "name": "踏雪寻梅",
          "headline": "有点暴躁，喜欢文雅的骂人",
          "avatar_url": "https://picx.zhimg.com/50/v2-b883cdf52d032b554f98e413e6b87f86_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 0,
          "followers_count": 4859,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1719092374,
        "updated_time": 1719092374,
        "voteup_count": 22708,
        "thanks_count": 695,
        "comment_count": 1370,
        "is_copyable": false,
        "question": {
          "id": 610084775,
          "type": "question",
          "url": "https://api.zhihu.com/questions/610084775",
          "author": {
            "id": "f253e5191c8b30eab6e82ab19c9c8fc9",
            "url": "https://api.zhihu.com/people/f253e5191c8b30eab6e82ab19c9c8fc9",
            "user_type": "people",
            "url_token": "wen-cai-piao-yi",
            "name": "不要读管理专业",
            "headline": "工商管理垃圾专业",
            "avatar_url": "https://picx.zhimg.com/50/v2-bacfb1780e1eac21c7443f29da088d84_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 591,
            "is_following": false,
            "is_followed": false
          },
          "title": "张雪峰前几年一直被人骂，最近为什么风评变好了？",
          "created": 1688373670,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 23,
          "bound_topic_ids": [199568, 1392818, 2806760, 2812395, 2827121],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "看过他的一个视频，大概情节： 母亲连麦，说，父亲重病，怕影响孩子高考，暂时没告诉他，家庭很困难。 这样的剧情，一般人自然就讨论感情了。 但是，张雪峰非常冷静的给出了几个“接地气”的主意。 反转在这个时候出现了 母亲说，孩子数学考140，物理考100 张雪峰立马变了脸色，他使劲揉自己的脸 不断重复，“数学140，数学能考140” 然后说“家长，你能联系到我们客服吗？这孩子的志愿，我们免费做。” 他的语气还是那么自然，…",
        "excerpt_new": "看过他的一个视频，大概情节： 母亲连麦，说，父亲重病，怕影响孩子高考，暂时没告诉他，家庭很困难。 这样的剧情，一般人自然就讨论感情了。 但是，张雪峰非常冷静的给出了几个“接地气”的主意。 反转在这个时候出现了 母亲说，孩子数学考140，物理考100 张雪峰立马变了脸色，他使劲揉自己的脸 不断重复，“数学140，数学能考140” 然后说“家长，你能联系到我们客服吗？这孩子的志愿，我们免费做。” 他的语气还是那么自然，…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "disallowed",
        "content": "<p data-pid=\"MV-ugt7C\">看过他的一个视频，大概情节：</p><p data-pid=\"-tB8RlNf\">母亲连麦，说，父亲重病，怕影响孩子高考，暂时没告诉他，家庭很困难。</p><p data-pid=\"Uk567vDP\">这样的剧情，一般人自然就讨论感情了。</p><p data-pid=\"MRkXN83S\">但是，张雪峰非常冷静的给出了几个“接地气”的主意。</p><p data-pid=\"jAS0udrm\">反转在这个时候出现了</p><p data-pid=\"cRTN848p\">母亲说，孩子数学考140，物理考100</p><p data-pid=\"wZwMk-r_\">张雪峰立马变了脸色，他使劲揉自己的脸</p><p data-pid=\"JigSHuKF\">不断重复，“数学140，数学能考140”</p><p data-pid=\"nJNkQSlR\">然后说“家长，你能联系到我们客服吗？这孩子的志愿，我们免费做。”</p><p data-pid=\"PZ9uzGob\">他的语气还是那么自然，我感觉很震撼。举个不太恰当的类比，如果这个情节在春晚小品里，肯定是无比煽情的。</p><p data-pid=\"2igHk0iQ\">可是张雪峰把握的非常稳，非常平淡，非常接地气，非常感人………</p><p data-pid=\"h3YpUbzR\">母亲说了很多感谢的话</p><p data-pid=\"2Hmk4yku\">挂断之后</p><p data-pid=\"IgdI9ks2\">张雪峰严肃的说：直播间这么多人在啊，这个孩子的大学四年学费我包了。</p><p data-pid=\"evEbcGc7\">然后他经典的坏笑：很有可能这哥们只让我出大一的钱，大二大三是有奖学金的！</p><p data-pid=\"ensYMj_M\">。</p><p data-pid=\"Lx7WJTfe\">。</p><p data-pid=\"SNAUnR1N\">。</p><p data-pid=\"rY_guD1R\">他的几个情感转换非常自然，没有一点是在表演。</p><p data-pid=\"v805slUH\">他当然是生意人，他也是好老师</p><p data-pid=\"1Uzfz7gz\">他很冷静，他也很多情</p><p data-pid=\"pfwXAIkM\">我很喜欢他，只要他的公司还在，我孩子高考的时候，我肯定愿意在他公司花钱咨询。</p><p></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 1483433,
        "favorite_count": 1451,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3539131116}",
      "attached_info": "Cu0ECIGsh+Oi3pC7nAEQBBoJNjczNTUxMTEwIJaJ3bMGKLSxATDaCkAUSigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9Wgg5Nzg1NTEyM2IgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjM1MzkxMzExMTaKAQk2MTAwODQ3NzWqAQlyZWNvbW1lbmTCASBjNDZiMWU2MmYyZDJiMjEzMTA3ZmVjZWJhNjRkZTM0NvIBCggMEgZOb3JtYWzyASgIChIkM2Q0NzFjZGItNjE0OC00MDJmLWE4NDktMGEzY2EyMjI5NDI58gEFCAsSATSCAgCIAuLX8JiNMpICIGM0NmIxZTYyZjJkMmIyMTMxMDdmZWNlYmE2NGRlMzQ2mgIAygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCE1RTX1NPVVJDRV9GRUVEUkVfVjjoAgL6AgtOT1JNQUxfRkxPV4oDIGI4YTEyNDYxOTk0MDRmMDU5ZDU5YzkzMmRiZjlhNmJkmgMNCgJ2MBAAGgVvdGhlcqgDqcVa2AMA6gMJZmVlZHJlX3Y4+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAIzMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAgFY/xT+BBQAAAAAAAAAAiQVMDL8/v3+pP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUEkAYAkgIlCgk2NzM1NTExMTASCjM1MzkxMzExMTYYBCIKSU1BR0VfVEVYVA==",
      "action_card": false
    }, {
      "id": "21_1721528757.287",
      "type": "feed",
      "offset": 21,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528757,
      "updated_time": 1721528757,
      "target": {
        "id": 3439986421,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3439986421",
        "author": {
          "id": "3841a1b5db0038a0c314e26a1428e385",
          "url": "https://api.zhihu.com/people/3841a1b5db0038a0c314e26a1428e385",
          "user_type": "people",
          "url_token": "zhuang-kang-chuan",
          "name": "庄康川",
          "headline": "",
          "avatar_url": "https://pic1.zhimg.com/50/v2-57dd80534600e87dd41d207f0ebe1231_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 366,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1711109870,
        "updated_time": 1711109870,
        "voteup_count": 3014,
        "thanks_count": 138,
        "comment_count": 513,
        "is_copyable": true,
        "question": {
          "id": 463190146,
          "type": "question",
          "url": "https://api.zhihu.com/questions/463190146",
          "author": {
            "id": "d253f3e658a6fafb9e6908f45fc5572a",
            "url": "https://api.zhihu.com/people/d253f3e658a6fafb9e6908f45fc5572a",
            "user_type": "people",
            "url_token": "zixi-34",
            "name": "zixi",
            "headline": "牛津大学纯艺术系/gap中",
            "avatar_url": "https://picx.zhimg.com/50/v2-6090b52871ea6320e05f4c98d7100d03_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 2,
            "is_following": false,
            "is_followed": false
          },
          "title": "你写过的最蠢的代码是？",
          "created": 1622818488,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 13,
          "bound_topic_ids": [99, 225, 707, 3123],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "c语言考试让编个程计算1+2²+3²一直加到n²，然后写的循环跑不下去，最后快交卷时候写了个，printf n(n+1)(2n+1)/6，然后成功及格",
        "excerpt_new": "c语言考试让编个程计算1+2²+3²一直加到n²，然后写的循环跑不下去，最后快交卷时候写了个，printf n(n+1)(2n+1)/6，然后成功及格",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"92w-BSmD\">c语言考试让编个程计算1+2²+3²一直加到n²，然后写的循环跑不下去，最后快交卷时候写了个，printf n(n+1)(2n+1)/6，然后成功及格</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 856897,
        "favorite_count": 357,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3439986421}",
      "attached_info": "CosFCIGsh+Oi3pC7nAEQBBoJNjU1NTI2MDQ1IO7t9a8GKMYXMIEEQBVKKAoTVFNfU09VUkNFX0ZFRURSRV9WOBIBMBgAIAA6CnsicmF3IjoiIn1aCDY1MjEwODQzYiA0NzI0NDI3MDEzMTc4YzcxNDViNmY1N2JjYzYyZjUxYXIKMzQzOTk4NjQyMYoBCTQ2MzE5MDE0NqoBCXJlY29tbWVuZMIBIDM4NDFhMWI1ZGIwMDM4YTBjMzE0ZTI2YTE0MjhlMzg18gEKCAwSBk5vcm1hbPIBKAgKEiQ4NDE1YzY4Yi01M2Q0LTQwY2QtOTIwNC1lODA2ZGI4YTZmNGHyAQUICxIBNIICAIgC4tfwmI0ykgIgMzg0MWExYjVkYjAwMzhhMGMzMTRlMjZhMTQyOGUzODWaAgDKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxl2gITVFNfU09VUkNFX0ZFRURSRV9WOOgCAvoCC05PUk1BTF9GTE9XigMgYjhhMTI0NjE5OTQwNGYwNTlkNTljOTMyZGJmOWE2YmSaAw0KAnYwEAAaBW90aGVyqAPBpjTYAwDqAwlmZWVkcmVfdjj6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAzE2MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAwFX0xj+BBQAAAAAAAAAAiQVMDL8/v3+pP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUEkAYAkgIlCgk2NTU1MjYwNDUSCjM0Mzk5ODY0MjEYBCIKSU1BR0VfVEVYVA==",
      "action_card": false
    }, {
      "id": "22_1721528757.167",
      "type": "feed",
      "offset": 22,
      "verb": "TOPIC_ACKNOWLEDGED_ARTICLE",
      "created_time": 1721528757,
      "updated_time": 1721528757,
      "target": {
        "id": 622795909,
        "type": "article",
        "url": "https://api.zhihu.com/articles/622795909",
        "author": {
          "id": "4f266260f941bd4beb2cecf7647878a6",
          "url": "https://api.zhihu.com/people/4f266260f941bd4beb2cecf7647878a6",
          "user_type": "people",
          "url_token": "xiao-yu-bu-kun-31",
          "name": "算命的说我很爱吃",
          "headline": "这个人很懒，什么都没留下",
          "avatar_url": "https://picx.zhimg.com/50/v2-679055884db92c679036b6a5d68c0ae8_l.jpg?source=b6762063",
          "is_org": false,
          "gender": -1,
          "followers_count": 524,
          "is_following": false,
          "is_followed": false
        },
        "title": "一位鼻腔敏感人士改善的真实经历（有更新）",
        "comment_permission": "all",
        "created": 1681789063,
        "updated": 1721017065,
        "voteup_count": 66,
        "voting": 0,
        "comment_count": 5,
        "linkbox": {
          "category": "",
          "pic": "",
          "title": "",
          "url": ""
        },
        "excerpt": "这个帖子写于24年1月12日，今天是24年7月11日，实践了半年多，我来更新啦 最容易导致我复发的柳絮花香和空调已经完全击不起我任何症状反应了，我真的把鼻腔敏感控制住了 原文被误删我就重新叙述了 背景：我多年过鼻腔敏感史，严重型，一年四季频发。没有最容易发作的时间，几乎所有时间所有节点里都可能是我的频发期 起因：因为我肠胃不好，经常拉肚子，所以平时对饮食要求比较严格。但自己又比较馋，为了更好的保护肠胃我在家里…",
        "excerpt_new": "这个帖子写于24年1月12日，今天是24年7月11日，实践了半年多，我来更新啦 最容易导致我复发的柳絮花香和空调已经完全击不起我任何症状反应了，我真的把鼻腔敏感控制住了 原文被误删我就重新叙述了 背景：我多年过鼻腔敏感史，严重型，一年四季频发。没有最容易发作的时间，几乎所有时间所有节点里都可能是我的频发期 起因：因为我肠胃不好，经常拉肚子，所以平时对饮食要求比较严格。但自己又比较馋，为了更好的保护肠胃我在家里…",
        "preview_type": "default",
        "preview_text": "",
        "content": "<p data-pid=\"lMAusUTL\">这个帖子写于24年1月12日，今天是24年7月11日，实践了半年多，我来更新啦</p><p data-pid=\"-9avArg7\">最容易导致我复发的柳絮花香和空调已经完全击不起我任何症状反应了，我真的把鼻腔敏感控制住了</p><p data-pid=\"8fdxBD_j\">原文被误删我就重新叙述了</p><hr/><p data-pid=\"P951C-ow\"><b>背景：</b></p><p data-pid=\"zqNyTgaM\">我多年过鼻腔敏感史，严重型，一年四季频发。没有最容易发作的时间，几乎所有时间所有节点里都可能是我的频发期</p><hr/><p data-pid=\"pHVEiUpJ\"><b>起因：</b></p><p data-pid=\"1djPBGI6\">因为我肠胃不好，经常拉肚子，所以平时对饮食要求比较严格。但自己又比较馋，为了更好的保护肠胃我在家里备了几盒益生菌，在大吃大喝后都会吃上1-2包。</p><p data-pid=\"RItFN6KZ\">后来发现在发作期，我只要吃了益生菌鼻腔敏感出现的一系列症状（像鼻子痒、分泌物、不通气、头昏头痛.....）就能很快缓解，而且基本都是隔天必好。</p><p data-pid=\"4apDMzTB\">就很稀奇，然后研究了一下惊奇的发现 益生菌居然对过敏性鼻腔敏感有针对效果！！！</p><p data-pid=\"_owWgCU9\">副干酪乳杆菌LP-33 还是鼻敏人士的天命菌株</p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-20ff281c8b0391758d08e9017bbf4dac_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1179\" data-rawheight=\"1172\" data-original-token=\"v2-2b5f0e23f3662a428f975398935cb643\" class=\"origin_image zh-lightbox-thumb\" width=\"1179\" data-original=\"https://pic1.zhimg.com/v2-20ff281c8b0391758d08e9017bbf4dac_r.jpg\"/></figure><p data-pid=\"TSYkYIYF\">补充鼠李糖乳酸杆菌、副干酪乳杆菌后，可抑制过敏球蛋白lgE、平衡TH1/TH2，鼻腔敏感症状减轻，自身抗敏提高。</p><p data-pid=\"1Dzwv-Nb\">服用含有特定益生菌株的儿童和青少年，鼻腔敏感症状的发生率明显下降，这表明益生菌对于鼻腔敏感的儿童和青少年也同样有显著效果。</p><p data-pid=\"IcKhTnrK\">然后搜索同类菌株益生菌的时候 发现还真的有相关产品，而且针对菌株的种类更全</p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-58a272fd06df82635de3fe3ce02e0522_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1702\" data-rawheight=\"1276\" data-original-token=\"v2-b0e5a55b57e95fdfed6bbe68fed1176a\" class=\"origin_image zh-lightbox-thumb\" width=\"1702\" data-original=\"https://pic3.zhimg.com/v2-58a272fd06df82635de3fe3ce02e0522_r.jpg\"/></figure><p data-pid=\"salQ937h\">在好奇心的驱使下买了三盒。</p><p data-pid=\"qxEnrrOG\">初步感觉到效果之后就发了这篇文章给大家分享喜悦。</p><p data-pid=\"OylYCSea\">然后又实践了大几个月的时间，来测试能不能完全改善我的症状。</p><hr/><p data-pid=\"hImvDZ_N\">现在得到结果：</p><p data-pid=\"P7uw1QVR\"><b>我用以前最最容易引起的一些方式去刺激 验证、</b></p><p data-pid=\"GyZgjiaz\"><b>比如开空调吹凉风、吃冷饮吃火锅，甚至去到柳絮飘飞各种花开的公园里面，但是都没有引起我一点点的症状反应。</b></p><p data-pid=\"v_0kPl23\">具研究文献说是可阻挡75%发作率，提升82.2%抗敏性，可见我自身抗敏性直线上升。</p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"ZRe-N31c\">我看评论区有尝试过的基本都有不同程度的改善，也从侧面验证了。</p><p data-pid=\"56U-DyPb\">非常能帮到大家，也建议大家不要暂时性的好转之后就停掉，一定像我这样多坚持一段时间，提高自己的抗敏性，以后就不容易发作啦</p><hr/><p data-pid=\"CGMBhn6T\">关于大家评论包括私信一直在问如何购买的问题 我本不想回复，因为原本就是本着与大家分享共讨的目的发的文，如果内容中有任何暗示或者明示，文章的真实度会被大打折扣。</p><p data-pid=\"OVxJCHQ7\">但总是有买完益生菌之后又来问我的陌生朋友，很多都是乱七八糟没啥用的菌株，白扔钱。。</p><p data-pid=\"kn80-OTV\">不是所有菌株都是有用的，适用于鼻腔敏感呼吸道敏感的菌株并不多！大家多做功课</p><p data-pid=\"Q7i31XCx\">以下六个菌株较为实用，其中前4个菌株适合儿童</p><p data-pid=\"_NAQWjeZ\">鼠李糖乳酸杆菌、植物乳杆菌、长双歧杆菌、罗氏杆菌、副干酪乳杆菌、发酵乳酸杆菌</p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-ffe577c6a9f76933c19716a573940e4a_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1280\" data-rawheight=\"317\" data-original-token=\"v2-fa10c4237c54ddac06a074a316fcea0b\" class=\"origin_image zh-lightbox-thumb\" width=\"1280\" data-original=\"https://pic3.zhimg.com/v2-ffe577c6a9f76933c19716a573940e4a_r.jpg\"/></figure><p data-pid=\"LpxDQ4WO\">也有很多纯糖添加 再勾兑一点益生菌就打着鼠李糖乳酸杆菌、副干酪乳杆菌名号的产品，不仅没有实质效果，还会加重肠胃负担！！大家要谨慎些</p><p data-pid=\"vS-cWCtL\">所以我把图片更上了，另外扫了追溯码弹了官方网址出来，顺便放在这里供需要的朋友去了解咨询，</p><a href=\"https://xg.zhihu.com/plugin/b504067c5634e9169f76a57e652bbe1c?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\"><span class=\"invisible\">https://</span><span class=\"visible\">xg.zhihu.com/plugin/b50</span><span class=\"invisible\">4067c5634e9169f76a57e652bbe1c?BIZ=ECOMMERCE</span><span class=\"ellipsis\"></span></a><p data-pid=\"qPvIm02y\">祝大家都能早日改善</p>",
        "is_labeled": false,
        "visited_count": 14403,
        "thumbnails": ["https://picx.zhimg.com/50/v2-9d234dde296d856d5b6e1b548fdd7da2_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-81509e7191a7954153664a0b42cbf936_720w.jpg?source=b6762063"],
        "favorite_count": 516
      },
      "brief": "{\"source\": \"TS\", \"type\": \"article\", \"id\": 622795909}",
      "attached_info": "CqgFCIGsh+Oi3pC7nAEQBxoJMjI2NTMwMzQxIIeh+KEGKEIwBUAWShkKDlByb21vdGlvbkV4dHJhEgEwGAAgADoAYiA0NzI0NDI3MDEzMTc4YzcxNDViNmY1N2JjYzYyZjUxYXIJNjIyNzk1OTA5qgEJcmVjb21tZW5kwgEgNGYyNjYyNjBmOTQxYmQ0YmViMmNlY2Y3NjQ3ODc4YTbyAQkIDBIFWlBsdXPyASgICRIkMzBkZjg2NDUtMDZhYS00MjdmLWFmYjktNTgwNmI2MDRjNWU38gEoCAoSJDVlZjI4YzgwLWU5ZjAtNDNlNS04ZDVhLTc4ZjJhOGEzNDMwN/IBBQgLEgE08gEICAgSBHRydWWCAgCIAuLX8JiNMpICIDRmMjY2MjYwZjk0MWJkNGJlYjJjZWNmNzY0Nzg3OGE2mgIAygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxlygIXWnBsdXNHclNjb3JlV2VpZ2h0UnVsZTHKAg5DdXJyZW5jeVJhbmtlcsoCDnNsb3RJbnNlcnRSdWxl2gIOUHJvbW90aW9uRXh0cmHoAgP6AgtOT1JNQUxfRkxPV4oDIGI4YTEyNDYxOTk0MDRmMDU5ZDU5YzkzMmRiZjlhNmJkmgMNCgJ2MBAAGgVvdGhlcqgDw3DYAwD6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQBiAQAkgQFWlBsdXOaBAEzoAQAqAQAsAQAugQGbWFudWFswgQDMTU1yAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAAAA4rmSP4EF1nQELGO+WECJBUwMvz+/f6k/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFym12CeGVG0DQBQDgBQDoBQDwBQSQBgCSAiQKCTIyNjUzMDM0MRIJNjIyNzk1OTA5GAciCklNQUdFX1RFWFQ=",
      "action_card": false,
      "promotion_extra": "{\"is_card\":true,\"id\":\"3204863\",\"topstory_info\":\"bid=295.8965671920076&pctr=0.012570202350616455&price=0&pv_id=30df8645-06aa-427f-afb9-5806b604c5e7\",\"parameters\":\"plugcb=https%3A%2F%2Fsugar.zhihu.com%2Fplutus_adreaper_callback%3Fcid%3D3204863%26ccid%3D1343930%26zoneid%3D10012%26adid%3D3273744%26sid%3D30df8645-06aa-427f-afb9-5806b604c5e7%26adsource%3Dzhi_plus%26ocpxs%3D1%26ocpxp%3D1700%26dynamictitle%3D0%26mixinfo%3D__MIX__INFO__%26campaignid%3D2306763%26cbed%3DBCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw%3D%3D%26cmixid%3D%26cmixvs%3D%26isnative%3Dfalse\",\"sign\":\"cc7c60f0-7828-42ec-8c4b-148dafbbd5a0\",\"mobile_experiment\":null,\"new_asset\":\"\",\"click_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEEKVQqOSuIYIdBvEo7Wg==\"],\"view_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEEPFEmLWm8-o_znDYB\"],\"view_x_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEEPFkvMyQRUT0SUjjPgwqNSpceEg==\",\"https://sugar.zhihu.com/ad-track/zplus_log?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEEPFEmLR820zpS4V8L1jE=\"],\"deliver_x_tracks\":[\"http://proxy-ad-track-zplus:10000/ad-track/zplus_log?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEELl0vMzYrVw0fll1t8qj4XUE=\"],\"impression_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEEI1UzKCU9VjsIXwyIzIulhGWC\"],\"conversion_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEEKVctLCU8VjsIX1u2KBLeP1SB\"],\"topstory_tracks\":[\"http://proxy-ad-track-zplus-bid:10000/ad-track/zplus/bid?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEELF0mPh8nSzQIRYVahjjLuoY=&rki=__RANK__INFO__&fri=__FILTER__INFO__&fin=1\"],\"video_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmv=&pt=3&hp=0&tev=0&ar=0.018287211656570435&cv=&mix=__MIX__INFO__&cmi=&ed=BCZJMl8sOyxzFGdBQiA5WQ82BGxbKmdyfBNnVAFjeAFNNlB3C3M-JnYTZlIcYHpRCmgNeA8ldyEoR2tKBGh8BglzCX5bdj93aEAxF1IjcQBNJl0-TH5qZiFGJBUMYGIAWXMMegx2bXZ8FWRVAWd-B15jSThRcWdxfhVjUAJ2LUoCeAh6CHJoZi9Mb1QDZ38HX3EfKVw3KX1-AzELQm1qQwIoBGcJd2N5eR1gVQNifAFbcQp6AXZjZitGIgRFbXwWBCZJMkh-a3d-FXQERSlxQAQ2TWxOOTN9fgMiFVhtfQNefAl4C2U-IzhXb1cfYHwAW3QOfQ96bHF9E2teBGN9AVN2HylZKmdyfRVkUAdjalweLARzDHNrd38SYVMXMz5ZVnYLegx7bHNoXyILRCM8RFZ0HzlXfmhmOEcmWgF2I1MbPUp3CWU5LzoYZ0FQMjwNW2NMI1Z-a3B-FWNXAWN7FggtW3cIZTsyJRhgQVgzcQFNJE8jBXVudXwVZUFSMSINDSRVOV1lOTRzFGFTAml_AE0mXT5RfmhyeBBhVwJkfRYJNQRzAG1jd3odYlUIZ3kAWHMMfR4iPCEtGHdQc3V-AgkqVj4dcWhlfWRjSQR1fnNOdwspVzAuHyhEMRNeImkCWWAKCwlmaANrF2ACUiAvFVl3HHl5cn9yDQBgVV0kPhVZdxx5eXN0cX8TYVMIY3UJW30AcglwaHNrFxFCA2IgRBkaVSVfKi5lfBd3VHB9fh5bdw5-DnBjcXwcZFQJZnsVWQYceAosOTAtejABFGJ-FVgECGQMdW50fxZiXwRmfwJacAtzHXEZZXwXJQJYNyREDiFmLFkgLi88AGBVFGMNAU5yfWxaLDU0J0FvVgZpdAJScg96DHFicHoWZlEJaGpCGzdQdwlyaHF-FXQOViNxAE0mVjkFemxudxxnVAFmdQFecAp_AHC9-kjGUMPHHw==&zk=&zpluspt=1&cla=3&ri=feed-root:currency:f8cd7918-4ea2-4bcc-80b3-d83ed2c67872&mcdtt=0&ui=60.255.228.141&mcdti=0&isy=__IMAGE_STYLE__&cc=510600&zpt=&cl=&iti=__IS_THREE_IMAGE__&dts=1721528756&zri=-7172471748646808063&at=CjEEPFEnPy8RVT4GSP2lJbJWhW_G\"],\"video_play_tracks\":null,\"debug_tracks\":null,\"view_as_click_tm\":5}"
    }, {
      "id": "23_1721528757.568",
      "type": "feed",
      "offset": 23,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528757,
      "updated_time": 1721528757,
      "target": {
        "id": 3554439801,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3554439801",
        "author": {
          "id": "e9a228ff8a995274f46edf9d409e8023",
          "url": "https://api.zhihu.com/people/e9a228ff8a995274f46edf9d409e8023",
          "user_type": "people",
          "url_token": "wen-jun-nan-32",
          "name": "web key",
          "headline": "一个乱写的前端",
          "avatar_url": "https://picx.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 667,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1720350703,
        "updated_time": 1720350703,
        "voteup_count": 68,
        "thanks_count": 10,
        "comment_count": 45,
        "is_copyable": true,
        "question": {
          "id": 615053669,
          "type": "question",
          "url": "https://api.zhihu.com/questions/615053669",
          "author": {
            "id": "831cdb7f5739a6d104dc638b388d8981",
            "url": "https://api.zhihu.com/people/831cdb7f5739a6d104dc638b388d8981",
            "user_type": "people",
            "url_token": "yi-shui-15-81",
            "name": "有志",
            "headline": "再见是为了下次更好的相遇",
            "avatar_url": "https://pic1.zhimg.com/50/v2-46c4b674941d2b375557ca20a6b3aaf4_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 0,
            "is_following": false,
            "is_followed": false
          },
          "title": "我好好奇，前端为什么突然就G了？",
          "created": 1690879591,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 8,
          "bound_topic_ids": [225, 769, 7912],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "昨天去面试，那个老板是这样说的：每个月花两万块养一个前端，现在没多少公司养得起，不是说你们不值钱，而且因为现在的环境我们没办法养",
        "excerpt_new": "昨天去面试，那个老板是这样说的：每个月花两万块养一个前端，现在没多少公司养得起，不是说你们不值钱，而且因为现在的环境我们没办法养",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"ruzcGEwz\">昨天去面试，那个老板是这样说的：每个月花两万块养一个前端，现在没多少公司养得起，不是说你们不值钱，而且因为现在的环境我们没办法养</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 42711,
        "favorite_count": 19,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3554439801}",
      "attached_info": "Cr0FCIGsh+Oi3pC7nAEQBBoJNjc2MzMzOTE2IO/vqbQGKEQwLUAXSigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9Wgg5ODk1ODQ5M2IgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjM1NTQ0Mzk4MDGKAQk2MTUwNTM2NjmqAQlyZWNvbW1lbmTCASBlOWEyMjhmZjhhOTk1Mjc0ZjQ2ZWRmOWQ0MDllODAyM/IBCggMEgZOb3JtYWzyASgIChIkM2M1OTk2OWEtNDBmOS00MzFmLWFjZmEtNGE5OTdkYThjZTdm8gEFCAsSATSCAgCIAuLX8JiNMpICIGU5YTIyOGZmOGE5OTUyNzRmNDZlZGY5ZDQwOWU4MDIzmgIAygITVGhlbWVXYWtlVXBSZXdlaWdodMoCHEJheWVzRmlyc3RMZXZlbElzb2xhdGlvblJ1bGXKAg9CYXllc0ZpcnN0TGV2ZWzKAg9CYXllc0ZpcnN0TGV2ZWzKAg9CYXllc0ZpcnN0TGV2ZWzaAhNUU19TT1VSQ0VfRkVFRFJFX1Y46AIC+gILTk9STUFMX0ZMT1eKAyBiOGExMjQ2MTk5NDA0ZjA1OWQ1OWM5MzJkYmY5YTZiZJoDDQoCdjAQABoFb3RoZXKoA9fNAtgDAOoDCWZlZWRyZV92OPoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTcwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAAAANfzUP4EFAAAAAAAAAACJBUwMvz+/f6k/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQSQBgCSAiUKCTY3NjMzMzkxNhIKMzU1NDQzOTgwMRgEIgpJTUFHRV9URVhU",
      "action_card": false
    }];
    const list4 = [{
      "id": "24_1721528758.515",
      "type": "feed",
      "offset": 24,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528758,
      "updated_time": 1721528758,
      "target": {
        "id": 2972536238,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/2972536238",
        "author": {
          "id": "9a391792a9a6ad6492a1eeb5b0156f0e",
          "url": "https://api.zhihu.com/people/9a391792a9a6ad6492a1eeb5b0156f0e",
          "user_type": "people",
          "url_token": "qing-xiao-zhuan-39",
          "name": "晴小篆",
          "headline": "web技术栈 与 互联网",
          "avatar_url": "https://pica.zhimg.com/50/v2-ba7e713145adec7b1b8978e46a7a6d79_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 473,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1680844278,
        "updated_time": 1699763097,
        "voteup_count": 1086,
        "thanks_count": 559,
        "comment_count": 15,
        "is_copyable": true,
        "question": {
          "id": 29380608,
          "type": "question",
          "url": "https://api.zhihu.com/questions/29380608",
          "author": {
            "id": "32b883272e1670e4824c7cfa2a54d6c7",
            "url": "https://api.zhihu.com/people/32b883272e1670e4824c7cfa2a54d6c7",
            "user_type": "people",
            "url_token": "wang-jiang-yu-233",
            "name": "王江禹",
            "headline": "",
            "avatar_url": "https://pic1.zhimg.com/50/v2-fe5695061cadce9521e86d569e4504d3_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 182,
            "is_following": false,
            "is_followed": false
          },
          "title": "前端开发中有什么经典的轮子值得自己去实现一遍？",
          "created": 1428421668,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 7,
          "bound_topic_ids": [213, 225, 769, 1354, 7912],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "thumbnail": "https://pica.zhimg.com/50/v2-7962b5adfdb829a2e4c1abbb07ff648c_720w.jpg?source=b6762063",
        "excerpt": "有！ 以下所有推荐的项目都可以在 github 上直接找到。 冷门的， 我会贴上链接 推荐 redux 源码：代码量比较小，设计模式是非常优秀的。其次 koa 源码：代码量也不大，洋葱模式不了解一下？ umi-request： 所有 request 该有的功能都有，非常的强大，设计模式也是洋葱，还有中间件，拦截器等，非常适合新人入手学习！ dayjs ：Moment.js 的 2kB 轻量化方案，拥有同样强大的 API；能完美复刻那么强大的 Moment，而且整个工程项目 …",
        "excerpt_new": "有！ 以下所有推荐的项目都可以在 github 上直接找到。 冷门的， 我会贴上链接 推荐 redux 源码：代码量比较小，设计模式是非常优秀的。其次 koa 源码：代码量也不大，洋葱模式不了解一下？ umi-request： 所有 request 该有的功能都有，非常的强大，设计模式也是洋葱，还有中间件，拦截器等，非常适合新人入手学习！ dayjs ：Moment.js 的 2kB 轻量化方案，拥有同样强大的 API；能完美复刻那么强大的 Moment，而且整个工程项目 …",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"2yZaumI1\">有！</p><blockquote data-pid=\"ATRjIIvC\">以下所有推荐的项目都可以在 github 上直接找到。 冷门的， 我会贴上链接</blockquote><p data-pid=\"WRbEYdpM\"><br/>推荐 <b>redux</b> 源码：代码量比较小，设计模式是非常优秀的。</p><p data-pid=\"prLhJ-Jq\">其次 <b>koa</b> 源码：代码量也不大，洋葱模式不了解一下？</p><p data-pid=\"pcqlRw9A\"><b>umi-request</b>： 所有 request 该有的功能都有，非常的强大，设计模式也是洋葱，还有中间件，拦截器等，非常适合新人入手学习！</p><p data-pid=\"DPbh_BGo\"><b>dayjs</b> ：Moment.js 的 <b>2kB</b> 轻量化方案，拥有同样强大的 API；能完美复刻那么强大的 Moment，而且整个工程项目<b> 零依赖! </b></p><p data-pid=\"WT2VN2T1\"><b>solidjs：</b>这个可以说是继前端三大框架之后， 最有名的  web 框架了。性能极其强大、兼容 jsx 语法、压缩之后GZIP只有 7k， 它的源码包也是 零依赖， 难道不想看看它是怎么实现的？</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-8367991a33ab7e37a5b155d5235c521f_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"2000\" data-rawheight=\"1200\" data-original-token=\"v2-5c966439b209d4f5993199353fe68679\" data-default-watermark-src=\"https://pic3.zhimg.com/v2-12ba29281440c5e81b4de15d02fac01c_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"2000\" data-original=\"https://picx.zhimg.com/v2-8367991a33ab7e37a5b155d5235c521f_r.jpg\"/></figure><p data-pid=\"mNCpeUje\"><b>map-obj</b>： 这个比价小众了， 是做深度对象遍历的，怕大家找不到我直接贴链接， 怎么说呢， 源码就 70 行， 掌握好其中精髓之后， 妈妈再也不用担心面试官问我深度遍历 与 递归问题了。<a href=\"https://link.zhihu.com/?target=https%3A//github.com/sindresorhus/map-obj\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/sindresorhus</span><span class=\"invisible\">/map-obj</span><span class=\"ellipsis\"></span></a></p><p data-pid=\"OMLXqAo8\"><b>ahooks：</b>高质量高可靠性的 react hooks 封装。 之所以推荐他， 因为它的源码里面有 demo、有 test， 各种各样的 hooks 封装可以说是涵盖各种各样的业务开发场景。 可以说是保姆级教程封装的封装。 也是妈妈不用担心面试官问我 react hooks 相关问题。</p><p data-pid=\"falW-4MX\"><a href=\"https://link.zhihu.com/?target=https%3A//github.com/jhchen/fast-diff\" class=\" wrap external\" target=\"_blank\" rel=\"nofollow noreferrer\">fast-diff</a><b>:  </b>这个也比较小众， 当然也是零依赖， 它的作用是对大对象进行深度对比， 它有用极快的 diff 算法。 推荐这个的原因是， 这个库算法优秀， 代码量也比价少， 而且作者代码注释写的非常好非常多， 生怕你不懂， 可以说是代码的一半都是注释。<br/><a href=\"https://link.zhihu.com/?target=https%3A//github.com/jhchen/fast-diff\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/jhchen/fast-</span><span class=\"invisible\">diff</span><span class=\"ellipsis\"></span></a></p><p data-pid=\"8P2Io-62\"><b>flatiron/prompt: </b>非常漂亮的交互式命令行工具，  是不是感觉很屌， 不好意思， 源码只有 800 行， 而且超过半数都是注释， 也是保姆级学习项目。 如果你想学习 Nodejs 工具链， 千万不要错过。<br/><a href=\"https://link.zhihu.com/?target=https%3A//github.com/flatiron/prompt\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/flatiron/pro</span><span class=\"invisible\">mpt</span><span class=\"ellipsis\"></span></a></p><p data-pid=\"jBr2LxEY\"><b>simoneb/axios-hooks: </b>axios 大名鼎鼎没人不知道吧。axios-hooks 估计就没有认知到了， 实际上就是 axios 的 hooks 封装， 源码只有 300 行， 测试好，封装好， 还有很多 demo 示例， 直接跑测试就很容易入手。 妈妈不用担心我不会优雅的 react hooks 封装。<br/><a href=\"https://link.zhihu.com/?target=https%3A//github.com/simoneb/axios-hooks\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/simoneb/axio</span><span class=\"invisible\">s-hooks</span><span class=\"ellipsis\"></span></a></p><p data-pid=\"tBti_i53\"><b>sindresorhus/array-move： </b>如何优雅移动数组？ 16 行源码码带你了解答案。<br/><a href=\"https://link.zhihu.com/?target=https%3A//github.com/sindresorhus/array-move\" class=\" wrap external\" target=\"_blank\" rel=\"nofollow noreferrer\">GitHub - sindresorhus/array-move: Move an array item to a different position</a></p><p data-pid=\"r9KUwzfe\"><b>adamwdraper/Numeral-js： </b>强烈推荐！！！这个是是做数字串格式化与数字操作的。功能非常的强大， 放两个图自己感受一下就懂了。 而且它竟然是<b>零依赖家族， </b>最简单的代码实现最强大的功能。 源码看不懂都没关系， 有着三倍于源码的单测量，看不懂源码直接一步一步 debug 来看。保姆级！<br/><a href=\"https://link.zhihu.com/?target=https%3A//github.com/adamwdraper/Numeral-js\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/adamwdraper/</span><span class=\"invisible\">Numeral-js</span><span class=\"ellipsis\"></span></a></p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-13903668c296e59bba9dead576079a82_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1492\" data-rawheight=\"1606\" data-original-token=\"v2-58149b645ce79929e0c286e759fa7dd0\" data-default-watermark-src=\"https://pic2.zhimg.com/v2-bb60fe7627c9853df0545339004a7857_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"1492\" data-original=\"https://pic1.zhimg.com/v2-13903668c296e59bba9dead576079a82_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-91ceabb2eec5d433ebc67cdcc132fd7e_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1496\" data-rawheight=\"1362\" data-original-token=\"v2-602d4c9ad47e389488d8dee363e3e3de\" data-default-watermark-src=\"https://pic4.zhimg.com/v2-b2faadfaa9da8f57fbe583e4bbf63f4b_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"1496\" data-original=\"https://pic1.zhimg.com/v2-91ceabb2eec5d433ebc67cdcc132fd7e_r.jpg\"/></figure><p class=\"ztext-empty-paragraph\"><br/></p><hr/><blockquote data-pid=\"1o5MCV9a\">更新于 2023 年 07 月 23 日 <br/>没想到喜欢和点赞的人还挺多的， 再推荐几个</blockquote><p data-pid=\"F4P96AaA\"><b>wechatsync/Wechatsync： </b>一键同步文章到多个内容平台，支持今日头条、WordPress、知乎、简书、掘金、CSDN、typecho各大平台，一次发布，多平台同步发布。</p><p data-pid=\"ZyyU2Wi8\">这个真的是学习 chrome 插件开发的神级项目！！！ 学习这个可以深入理解 chrome 登录状态获取、markdown 文档转换、爬虫抓取等一些列的技术和能力；</p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"2LJ7ujFw\"><b>feross/clipboard-copy： </b>轻量级API ,直接复制内容到粘贴板。 源码非常少， 只有60行源码， 功能很强， 做到了复制内容到粘贴板，支持了降级处理等。 主要可以看看， 如果在 navigator.clipboard.writeText api 无法使用的情况下，该如何处理复制内容到粘贴板的问题；<br/><a href=\"https://link.zhihu.com/?target=https%3A//github.com/feross/clipboard-copy\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/feross/clipb</span><span class=\"invisible\">oard-copy</span><span class=\"ellipsis\"></span></a></p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"4xwHF398\"><b>scroll-into-view: </b>这个就很牛逼了，在你页面非常长的时候， 可以通过这个 api 直接给定元素，可以让给定的元素直接滚动到可视区；大名鼎鼎的 antd 就用到了这个库， 在表单场景自动跳转到错误的元素就是用的他。<br/>它有两个核心库， 加起来代码不超过 600 行（其中一半都是注释）， 也是保姆级教程；<br/>项目链接安排：<br/><a href=\"https://link.zhihu.com/?target=https%3A//github.com/scroll-into-view/scroll-into-view-if-needed\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/scroll-into-</span><span class=\"invisible\">view/scroll-into-view-if-needed</span><span class=\"ellipsis\"></span></a><br/><a href=\"https://link.zhihu.com/?target=https%3A//github.com/scroll-into-view/compute-scroll-into-view\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/scroll-into-</span><span class=\"invisible\">view/compute-scroll-into-view</span><span class=\"ellipsis\"></span></a></p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"PrvBB0CL\"><b>rstacruz/nprogress</b>：这个项目虽然有一定年代了， 但是内容一点儿也不过时。 它是给页面顶部添加加载进队条的。功能强大、源码不多、零依赖、实现简单、兼容性极强；<br/>如果再配合获取页面静态资源加载进度， 岂不是爽歪歪， 最牛逼的页面加载进度条： <a href=\"https://www.zhihu.com/question/578984216/answer/3131308956\" class=\"internal\">如何实现网页资源加载进度条？</a></p><p data-pid=\"hbxkqsXi\"><b>puleos/object-hash:</b> 基本上囊括了所有前端主流加密相关内容；源码也不多， 零依赖；还怕面试官问你加密问题？不存在的。</p><p class=\"ztext-empty-paragraph\"><br/></p><hr/><blockquote data-pid=\"sEzqhl7Z\">更新于 2023 年 11 月 12 日 </blockquote><p data-pid=\"2p4CuNpC\"><b>sindresorhus/p-defer：</b>非常经典的 defer 函数；使用场景非常多。 举一个例子， 比如A 页面执行了某一个操作， 同时 B 页面也执行了某一个操作。 但是我需要在 A 页面执行完成之后， 再执行 B 页面的后续操作任务， 甚至 B 页面的后续操作任务还需要拿到 A 页面的值；这个场景下 defer 函数作用就凸显出来了。<br/>源码只有 6 行；<br/>项目链接：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/sindresorhus/p-defer\" class=\" wrap external\" target=\"_blank\" rel=\"nofollow noreferrer\">GitHub - sindresorhus/p-defer: Create a deferred promise</a></p><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"DTQZcK-N\"><b>cnwhy/nzh： </b>阿拉伯数字转中文， 支持简体繁体。来看看使用示范:</p><div class=\"highlight\"><pre><code class=\"language-js\"><span class=\"kd\">var</span> <span class=\"nx\">nzhcn</span> <span class=\"o\">=</span> <span class=\"nx\">Nzh</span><span class=\"p\">.</span><span class=\"nx\">cn</span><span class=\"p\">;</span>                 <span class=\"c1\">// 使用简体中文,  另外有 Nzh.hk -- 繁体中文\n</span><span class=\"c1\"></span>\n<span class=\"nx\">nzhcn</span><span class=\"p\">.</span><span class=\"nx\">encodeS</span><span class=\"p\">(</span><span class=\"mi\">100111</span><span class=\"p\">);</span>              <span class=\"c1\">// 转中文小写 &gt;&gt; 十万零一百一十一\n</span><span class=\"c1\"></span><span class=\"nx\">nzhcn</span><span class=\"p\">.</span><span class=\"nx\">encodeB</span><span class=\"p\">(</span><span class=\"mi\">100111</span><span class=\"p\">);</span>              <span class=\"c1\">// 转中文大写 &gt;&gt; 壹拾万零壹佰壹拾壹\n</span><span class=\"c1\"></span><span class=\"nx\">nzhcn</span><span class=\"p\">.</span><span class=\"nx\">encodeS</span><span class=\"p\">(</span><span class=\"s2\">&#34;1.23456789e+21&#34;</span><span class=\"p\">);</span>    <span class=\"c1\">// 科学记数法字符串 &gt;&gt; 十二万三千四百五十六万万七千八百九十万亿\n</span><span class=\"c1\"></span><span class=\"nx\">nzhcn</span><span class=\"p\">.</span><span class=\"nx\">toMoney</span><span class=\"p\">(</span><span class=\"s2\">&#34;100111.11&#34;</span><span class=\"p\">);</span>         <span class=\"c1\">// 转中文金额 &gt;&gt; 人民币壹拾万零壹佰壹拾壹元壹角壹分\n</span></code></pre></div><p class=\"ztext-empty-paragraph\"><br/></p><p data-pid=\"PivLZ3-c\"><b>kevva/download： </b>下载和提取链接文件。 是一个 nodejs 库，非常短小精悍， 只有 100 行不到的源码。<br/>项目链接：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/kevva/download\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">github.com/kevva/downlo</span><span class=\"invisible\">ad</span><span class=\"ellipsis\"></span></a></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 154750,
        "thumbnails": ["https://pica.zhimg.com/50/v2-7962b5adfdb829a2e4c1abbb07ff648c_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-cb958ac0be7a7f344dfd20fb6efb177f_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-fa77ac6c7ff81359e9112d4903d2cae6_720w.jpg?source=b6762063"],
        "favorite_count": 4646,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 2972536238}",
      "attached_info": "CqoFCJWqiavV7NGVjAEQBBoJNTcwNTQ2OTA0IPbLvqEGKL4IMA9AGEoqCh1UU19TT1VSQ0VfSU5URVJFU1RfV09SRF9NRVJHRRIDMjI1GAAgADoAWgczOTM1MDY2YiA0NzI0NDI3MDEzMTc4YzcxNDViNmY1N2JjYzYyZjUxYXIKMjk3MjUzNjIzOIoBCDI5MzgwNjA4qgEJcmVjb21tZW5kwgEgOWEzOTE3OTJhOWE2YWQ2NDkyYTFlZWI1YjAxNTZmMGXyAQoIDBIGTm9ybWFs8gEoCAoSJGMwZTNhYTc1LWY2NDMtNGU5Mi05ZjJlLTcwNzBiMWMyYjUxN/IBBQgLEgE1ggIAiALn3vCYjTKSAiA5YTM5MTc5MmE5YTZhZDY0OTJhMWVlYjViMDE1NmYwZZoCAMoCG09sZENvbnRlbnRSZWR1Y2U1V2VpZ2h0UnVsZcoCE1RoZW1lV2FrZVVwUmV3ZWlnaHTaAh1UU19TT1VSQ0VfSU5URVJFU1RfV09SRF9NRVJHRegCA/oCC05PUk1BTF9GTE9XigMgYjAxNmQwMmExZmQwNDkxMGFjMjIyMjc0NDRjNjBiZmGaAw0KAnYwEAAaBW90aGVyqAP+uAnYAwDqAyJJbnRlcmVzdFdvcmRNZXJnZVYxTmV3UG9vbFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATOgBACoBACwBAC6BAZtYW51YWzCBAMxNzDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAAA9wbw/gQUAAAAAAAAAAIkFFvHlcsY+rT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFBZAGAJICJQoJNTcwNTQ2OTA0EgoyOTcyNTM2MjM4GAQiCklNQUdFX1RFWFQ=",
      "action_card": false
    }, {
      "id": "25_1721528758.386",
      "type": "feed",
      "offset": 25,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528758,
      "updated_time": 1721528758,
      "target": {
        "id": 3552743947,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3552743947",
        "author": {
          "id": "10c0d4e8241717d8e562a9ceff944d14",
          "url": "https://api.zhihu.com/people/10c0d4e8241717d8e562a9ceff944d14",
          "user_type": "people",
          "url_token": "leafist",
          "name": "齐小白",
          "headline": "周杰伦,程序员,中级会计,有丰富的换行不怎么成功的经验",
          "avatar_url": "https://pica.zhimg.com/50/v2-fbf0388b16530cdb6909d1231e9e1c9d_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 536,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1720185397,
        "updated_time": 1720185397,
        "voteup_count": 63,
        "thanks_count": 5,
        "comment_count": 64,
        "is_copyable": true,
        "question": {
          "id": 606101860,
          "type": "question",
          "url": "https://api.zhihu.com/questions/606101860",
          "author": {
            "id": "b9840c983f4f7e7aedb10e6b0ad126fc",
            "url": "https://api.zhihu.com/people/b9840c983f4f7e7aedb10e6b0ad126fc",
            "user_type": "people",
            "url_token": "qiu-sheng-23-64",
            "name": "秋生",
            "headline": "秋天见。",
            "avatar_url": "https://picx.zhimg.com/50/v2-30fd59dc505e7275f2d955c2169a6195_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 0,
            "followers_count": 252,
            "is_following": false,
            "is_followed": false
          },
          "title": "VS Code凭什么如此受欢迎?",
          "created": 1686522132,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 6,
          "bound_topic_ids": [376, 769, 157740],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "昨天装了 mysql 插件，6 的飞起。从此告别 navicat.爽",
        "excerpt_new": "昨天装了 mysql 插件，6 的飞起。从此告别 navicat.爽",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"yIqR6mDs\">昨天装了 mysql 插件，6 的飞起。从此告别 navicat.爽</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 61474,
        "favorite_count": 114,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3552743947}",
      "attached_info": "CusECJWqiavV7NGVjAEQBBoJNjc2MDI1MzUzILXkn7QGKD8wQEAZSigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9Wgg5Njk2OTQzOWIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjM1NTI3NDM5NDeKAQk2MDYxMDE4NjCqAQlyZWNvbW1lbmTCASAxMGMwZDRlODI0MTcxN2Q4ZTU2MmE5Y2VmZjk0NGQxNPIBCggMEgZOb3JtYWzyASgIChIkZTM0ODE3YWEtNThmZC00N2Q1LWFiM2UtMzI5ODdiZjgyMzAy8gEFCAsSATWCAgCIAufe8JiNMpICIDEwYzBkNGU4MjQxNzE3ZDhlNTYyYTljZWZmOTQ0ZDE0mgIAygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCE1RTX1NPVVJDRV9GRUVEUkVfVjjoAgL6AgtOT1JNQUxfRkxPV4oDIGIwMTZkMDJhMWZkMDQ5MTBhYzIyMjI3NDQ0YzYwYmZhmgMNCgJ2MBAAGgVvdGhlcqgDouAD2AMA6gMJZmVlZHJlX3Y4+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAMxNjDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAGAvnME/gQUAAAAAAAAAAIkFFvHlcsY+rT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFBZAGAJICJQoJNjc2MDI1MzUzEgozNTUyNzQzOTQ3GAQiCklNQUdFX1RFWFQ=",
      "action_card": false
    }, {
      "id": "26_1721528758.406",
      "type": "feed",
      "offset": 26,
      "verb": "TOPIC_ACKNOWLEDGED_ARTICLE",
      "created_time": 1721528758,
      "updated_time": 1721528758,
      "target": {
        "id": 696533668,
        "type": "article",
        "url": "https://api.zhihu.com/articles/696533668",
        "author": {
          "id": "06dce05b4de64a1c80062b1a31d93b53",
          "url": "https://api.zhihu.com/people/06dce05b4de64a1c80062b1a31d93b53",
          "user_type": "people",
          "url_token": "43-44-66-15-32",
          "name": "南京春夏",
          "headline": "",
          "avatar_url": "https://picx.zhimg.com/50/v2-34841a980db40d648a79ffafdba08ec1_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 0,
          "followers_count": 538,
          "is_following": false,
          "is_followed": false
        },
        "title": "有什么健康科学的减肥方式吗？",
        "comment_permission": "censor",
        "created": 1715140108,
        "updated": 1720661370,
        "voteup_count": 163,
        "voting": 0,
        "comment_count": 12,
        "linkbox": {
          "category": "",
          "pic": "",
          "title": "",
          "url": ""
        },
        "excerpt": "直说了，我是通过药店买的 代谢饮提高身体代谢、脂肪燃烧和热量成功减肥的亲身实践，3个月瘦了28斤， 半年共计瘦身42斤，没反弹想减肥的朋友先给大家避开一些我自己踩过的坑： ❗不要相信任何可以 急速瘦身的概念性减肥产品，包括但不限于“益生菌”“祛湿膏”“白芸豆”等这些都是在知乎搜减肥出现在前排高赞文里卖的货 什么科学依据都没有，里面全是给肠道 “打鸡血”的添加剂，我都试过没啥卵用，纯属心理安慰❗ 不要一上…",
        "excerpt_new": "直说了，我是通过药店买的 代谢饮提高身体代谢、脂肪燃烧和热量成功减肥的亲身实践，3个月瘦了28斤， 半年共计瘦身42斤，没反弹想减肥的朋友先给大家避开一些我自己踩过的坑： ❗不要相信任何可以 急速瘦身的概念性减肥产品，包括但不限于“益生菌”“祛湿膏”“白芸豆”等这些都是在知乎搜减肥出现在前排高赞文里卖的货 什么科学依据都没有，里面全是给肠道 “打鸡血”的添加剂，我都试过没啥卵用，纯属心理安慰❗ 不要一上…",
        "preview_type": "default",
        "preview_text": "",
        "content": "<p data-pid=\"M3fIBtjf\">直说了，我是通过药店买的<b>代谢饮提高身体代谢、脂肪燃烧和热量</b>成功减肥的</p><p data-pid=\"7NCtM63t\">亲身实践，3个月瘦了28斤，<b>半年共计瘦身42斤</b>，没反弹</p><p data-pid=\"C3HjSqav\">想减肥的朋友先给大家避开一些我自己踩过的坑：</p><p data-pid=\"NXrDR4jM\">❗不要相信任何可以<b>急速瘦身</b>的概念性减肥产品，包括但不限于<b>“益生菌”“祛湿膏”“白芸豆”</b>等</p><p data-pid=\"FtL2GI06\">这些都是在知乎搜减肥出现在前排高赞文里卖的货</p><p data-pid=\"JDG2Sx-j\">什么科学依据都没有，里面全是给肠道<b>“打鸡血”的添加剂</b>，我都试过没啥卵用，纯属心理安慰</p><p data-pid=\"A7eJ2KfB\">❗<b>不要一上头就跟风买任何运动器械，</b>最后都会搁置，别太相信自己得自控力，我大几千的椭圆仪买回来已经沦为衣架子了</p><p data-pid=\"17DC79Qo\">如果你可以坚持跟刘教练跳2个月操的话再考虑这些！</p><p data-pid=\"FFDEhQNW\">❗一定要<b>管住嘴！管住嘴！管住嘴！</b></p><p data-pid=\"cNkaWEMj\">要经得起美食诱惑，但节食不可取，就算体重变轻了掉的也只是水分，很容易就会反弹还会伤胃</p><p data-pid=\"30hbilzq\">再来说下我自己的情况，目前25岁，身高160出头，但是最重的时候达到173斤</p><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-2d422df802820f79dc75de7cdb9523db_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1170\" data-rawheight=\"1581\" data-original-token=\"v2-a9438af20e67dd92415b148125bf1566\" class=\"origin_image zh-lightbox-thumb\" width=\"1170\" data-original=\"https://pic2.zhimg.com/v2-2d422df802820f79dc75de7cdb9523db_r.jpg\"/></figure><p data-pid=\"de9e_Gf7\">试过节食、21天减重法、私教课、清肠茶、白芸豆、生酮、酵素等能入口、不能入口的我都敢试</p><p data-pid=\"zUvGma1B\">结果就是：一停止就反弹，<b>前前后后我一共复胖4次！</b></p><p data-pid=\"Ek-V3lnX\">最近一次反弹是大学趁着课少每天雷打不动去健身，大半年小有成效从173减到152</p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-4d7ec077911bd6ec1eeb54fad53988a6_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1170\" data-rawheight=\"1315\" data-original-token=\"v2-0b3d12dc4da9af524d26056a9ab268aa\" class=\"origin_image zh-lightbox-thumb\" width=\"1170\" data-original=\"https://pic3.zhimg.com/v2-4d7ec077911bd6ec1eeb54fad53988a6_r.jpg\"/></figure><p data-pid=\"QdQ42GMz\">结果上班以后天天加班没空运动以后很快又回到了170</p><p data-pid=\"VPFbbzLe\">我悟了，我好像就是<b>网上说的喝水都胖体质</b></p><p data-pid=\"-wNzU0bN\">最过分的是<b>因为体型被职场霸凌</b>，上级领导直接在会议室当着好多同事面攻击我形象不好、土肥圆建议我去抽脂（原话非常难听...）</p><p data-pid=\"a0I-FCbW\">我也是魔怔了，在看到某网红切胃前后瘦了一半的对比，铁了心也要去切胃</p><p data-pid=\"dtZ1UoI7\">家里人和朋友一直在劝我，为了瘦身切胃太极端，朋友建议我先尝试服用一些<b>促进代谢、抑制食欲</b>的身体降脂剂量，如果有效就继续减下去，没必要切胃</p><p data-pid=\"dRjmVIE6\">当时我一脸不信，毕竟这种减肥产品我是没少吃</p><p data-pid=\"ryy8sg9b\">但朋友找了专业医师，很耐心的为我解释了</p><p data-pid=\"aAW-lasM\">减肥瘦身的底层逻辑在于：<b>消耗热量＞摄入热量</b></p><p data-pid=\"G9QK4kyK\">还提到了当我们的体重超过标准基数30斤后，五脏六腑的新陈代谢能力会变差</p><p data-pid=\"Z8Aum1IP\">比如我身高163cm标准体重为105斤，超过135斤就失衡了</p><p data-pid=\"aYvvoVV1\">吃的碳水、高油高糖的东西没办法消化掉，都转成热量被身体吸收了，长期以往就会形成脂肪长肉</p><p data-pid=\"7VSyKvXV\">同时医师还提到<b>饥饿素</b>，说大体重人群体内会<b>产生饥饿素</b>，这玩意儿会不停刺激你的大脑，让你疯狂想吃东西</p><p data-pid=\"XxvJ-z05\">也就是我们常说的<b>猪瘾犯了</b>，根本控制不住</p><p data-pid=\"va1duVkd\">这种情况想要健康且科学的瘦身，必须遵循以下三个环节：</p><p data-pid=\"M8J59NJe\"><b>阻断</b>（抑制饥饿感减少热量和脂肪合成）</p><p data-pid=\"YAc8ynKh\"><b>溶解</b>（深度燃烧脂肪让消耗热量＞摄入热量）</p><p data-pid=\"oSaOzpKr\"><b>代谢</b>（规律排便排出体外）</p><p data-pid=\"FEj4r6hd\">这套流程是白芸豆、益生菌、祛湿膏那些牛鬼蛇神做不到的！！！</p><p data-pid=\"YWwBZLx1\">最后给我拿了个进口的代谢饮，说是有<b>GMP/SGS检测认证通过</b>的安全瘦身产品，在<b>意大利4000多个药店</b>都能买得到</p><p data-pid=\"FxufYQxk\">（Ps：国外的药店对于这类产品把控是特别严格的，必须有临床数据支撑才能对外售卖）</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-e8a7efcb7520e9772464404708a8995d_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"924\" data-rawheight=\"1126\" data-original-token=\"v2-174cf3e97b6803eb99a83dbc6e333d99\" class=\"origin_image zh-lightbox-thumb\" width=\"924\" data-original=\"https://picx.zhimg.com/v2-e8a7efcb7520e9772464404708a8995d_r.jpg\"/></figure><p data-pid=\"nxMqJVMt\">它是那种一方面可以<b>控制人体的饥饿感</b>，减少脂肪合成数让你不继续发胖，另一方面去提升你的代谢让身体里堆积的脂肪能快速消耗代谢掉</p><p data-pid=\"xm1HKIDB\"><b>食欲减轻了、摄入少了、燃脂效率高了，</b>就算不改变生活习惯也能瘦得很快</p><p data-pid=\"YSteiZ-A\">再加上里面还有<b>维生素、海洋胶原蛋白</b>补气色，不会减得面色惨白、皮肤没光泽</p><p data-pid=\"Q6DPdTvj\"><b>所以说，真正的医师，真的不会瞎推荐的</b></p><p data-pid=\"lz_dA-fX\">一开始我也是半信半疑，一瓶喝了快1个月，上称少了12斤，中间完全没怎么运动过</p><p data-pid=\"mW7DuP_h\">这会儿比170多斤的时候肉眼看这都高了一些</p><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-971ceff39d86bd1cf60038afdb635029_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1170\" data-rawheight=\"1174\" data-original-token=\"v2-70410007dc04dc8bbb760835760a4fd8\" class=\"origin_image zh-lightbox-thumb\" width=\"1170\" data-original=\"https://pic2.zhimg.com/v2-971ceff39d86bd1cf60038afdb635029_r.jpg\"/></figure><p data-pid=\"Tq4AhGjb\">确实是有效果，也很适合我这种没时间运动、喝水都胖的人</p><p data-pid=\"XFAY1Vhj\">索性又买了几瓶持续喝着，前前后后喝了5瓶半年时间，<b>降到了120多斤</b></p><b><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-1bbae045c2eadd47b87d91e02547e069_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1170\" data-rawheight=\"919\" data-original-token=\"v2-ad34eb96ae83ae57fa75618bcc94824f\" class=\"origin_image zh-lightbox-thumb\" width=\"1170\" data-original=\"https://pic4.zhimg.com/v2-1bbae045c2eadd47b87d91e02547e069_r.jpg\"/></figure></b><b><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-02c8cdf8573673d24805ddfe8bda70cb_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1140\" data-rawheight=\"1702\" data-original-token=\"v2-a43f8695bac97da4171b5be1bbee964e\" class=\"origin_image zh-lightbox-thumb\" width=\"1140\" data-original=\"https://pic2.zhimg.com/v2-02c8cdf8573673d24805ddfe8bda70cb_r.jpg\"/></figure></b><b><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-b8a4fe38419773407391c367751cace7_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1170\" data-rawheight=\"1848\" data-original-token=\"v2-8a252632603a16c3c57f3dd6a0a2ff0b\" class=\"origin_image zh-lightbox-thumb\" width=\"1170\" data-original=\"https://pic2.zhimg.com/v2-b8a4fe38419773407391c367751cace7_r.jpg\"/></figure></b><b><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-7f6e37a1c62a5c981aac09920e3731ba_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1154\" data-rawheight=\"1552\" data-original-token=\"v2-d77c236bc2e70944cd06c415ab6b78ff\" class=\"origin_image zh-lightbox-thumb\" width=\"1154\" data-original=\"https://pic3.zhimg.com/v2-7f6e37a1c62a5c981aac09920e3731ba_r.jpg\"/></figure></b><p data-pid=\"6VWhF6rW\"><b>之前的裤子根本穿不下了，我还专门臭美发了条朋友hhhhh</b></p><b><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-16fdcd637eb077ef4fca75d96008238e_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1170\" data-rawheight=\"1246\" data-original-token=\"v2-05484ef9f6198a93a1fb2a8776de108d\" class=\"origin_image zh-lightbox-thumb\" width=\"1170\" data-original=\"https://pic3.zhimg.com/v2-16fdcd637eb077ef4fca75d96008238e_r.jpg\"/></figure></b><p data-pid=\"owrlaRJa\">因为体重基数变小减的就比较慢了，我也就没咋喝了</p><p data-pid=\"Zg9LAalN\">不得不说身体真的瘦了很多，看看原相机视频截图↓</p><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-033455944dc978416a438dc0443bedf8_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1136\" data-rawheight=\"1571\" data-original-token=\"v2-a815f594743d11bd481e9fc36c069163\" class=\"origin_image zh-lightbox-thumb\" width=\"1136\" data-original=\"https://pica.zhimg.com/v2-033455944dc978416a438dc0443bedf8_r.jpg\"/></figure><p data-pid=\"0D94b9A3\">而且就我自己的感觉来说，<b>胃口和饭量都小了</b></p><p data-pid=\"jPxPh9lf\">不像之前170多斤跟猪妖上身一样，控制不住的想吃东西了</p><p data-pid=\"7gzQ5H5I\">再加上年初的时候换了新工作下班时间多了，开始慢慢运动，现在已经很稳定的控制在<b>110斤了</b></p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-f1cef319621bea939d34dfa08722f3e8_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"896\" data-rawheight=\"1086\" data-original-token=\"v2-de5857c291e5f6485706522516f72300\" class=\"origin_image zh-lightbox-thumb\" width=\"896\" data-original=\"https://pic1.zhimg.com/v2-f1cef319621bea939d34dfa08722f3e8_r.jpg\"/></figure><p data-pid=\"ASet2cLe\">我觉得这个真的很重要，比起我吃过那些停用一个月就反弹的减肥产品要好多了</p><p data-pid=\"_S7MGs9N\">Hhhh，总之我觉得我这个经历真的有种爽文女主大翻身的感觉</p><p data-pid=\"Vioe8fkL\">瘦下来以后一整个大变样，<b>土肥圆爆改气质辣妹~</b></p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-f5de61894adf32cba845f270f9996bc1_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1061\" data-rawheight=\"1098\" data-original-token=\"v2-47f2adc32e2415a4b9cc8fdbae0c631b\" class=\"origin_image zh-lightbox-thumb\" width=\"1061\" data-original=\"https://pic4.zhimg.com/v2-f5de61894adf32cba845f270f9996bc1_r.jpg\"/></figure><hr/><p data-pid=\"EGBkNY2_\"><b>——2024年7月5日更新</b></p><p data-pid=\"5TY1Wx3H\">有姐妹在评论区问这个是不是必须挂号买、能不能国外代购，搞得有些骗子<b>在我评论区打广告</b>，为了避免大家被骗那些回复我都删了，评论筛选也开了</p><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-48deebca4510e683a6f6a91dd9d766f0_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1170\" data-rawheight=\"390\" data-original-token=\"v2-b2d56a1611d890c33aac7e3812702d2f\" class=\"origin_image zh-lightbox-thumb\" width=\"1170\" data-original=\"https://pica.zhimg.com/v2-48deebca4510e683a6f6a91dd9d766f0_r.jpg\"/></figure><p data-pid=\"bake6QID\">在这里说下哈，朋友们不要为了减肥相信任何代购消息哈，实在想买的可以<b>保存我上面的图搜同款！</b></p><hr/><p data-pid=\"c1VDZWt-\"><b>——2024年7月9日更新</b></p><p data-pid=\"BC0LTH04\">好多朋友私信我说按照我图片在网上搜的五花八门的，不确定哪个是真的，我专门又去咨询了医师助理，是这么回复我的</p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-637abac09f733feb7da815ab96e30345_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1169\" data-rawheight=\"1518\" data-original-token=\"v2-39bfbf0ff2b567811ac8b9ceaec5c1a2\" class=\"origin_image zh-lightbox-thumb\" width=\"1169\" data-original=\"https://pic4.zhimg.com/v2-637abac09f733feb7da815ab96e30345_r.jpg\"/></figure><p data-pid=\"j_LbEBWI\">如果真的对这个东西感兴趣，可以去<b>ZUCCARI它们品牌在天猫开的海外旗舰店</b>了解，顺便搞了个30块专属优惠券放在下面↓</p><a href=\"https://xg.zhihu.com/plugin/0c04e3f956f1d5d105b01fd1685a9642?BIZ=ECOMMERCE\" data-draft-node=\"block\" data-draft-type=\"link-card\" class=\"internal\">（插入链接）</a><p></p>",
        "is_labeled": false,
        "visited_count": 34531,
        "thumbnails": ["https://picx.zhimg.com/50/v2-1881d1fe530d5401004f9057bd24ba58_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-a00bdaba7b7ecb609086654d93bd8871_720w.jpg?source=b6762063", "https://pica.zhimg.com/50/v2-f36c3d2a0c5b1a02be6f6c834b37c899_720w.jpg?source=b6762063", "https://pica.zhimg.com/50/v2-b986eaf6b1ebd96f3978533dd01c4754_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-5078a0af979a8292703efb9cec4853f0_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-dd6b81803f43dc1e2818f02043a7e90a_720w.jpg?source=b6762063", "https://pica.zhimg.com/50/v2-412edcb849b030bd0aef7007c0e9141f_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-3464dda4b45ad4b3ee757f8145e288c8_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-b23ff5929c912a48d173119431060e92_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-62cf0b0e7fae4e25f28c9a4797fab321_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-b838b3f665c88f4384c8294337507021_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-7027113b1b507c8863dbe2eb2851468e_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-5a2cec322f69d8d7f0a2a39851ab0f2e_720w.jpg?source=b6762063"],
        "favorite_count": 75
      },
      "brief": "{\"source\": \"TS\", \"type\": \"article\", \"id\": 696533668}",
      "attached_info": "CqwFCJWqiavV7NGVjAEQBxoJMjQyOTE1MjgxIIzs67EGKKMBMAxAGkoZCg5Qcm9tb3Rpb25FeHRyYRIBMBgAIAA6AGIgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCTY5NjUzMzY2OKoBCXJlY29tbWVuZMIBIDA2ZGNlMDViNGRlNjRhMWM4MDA2MmIxYTMxZDkzYjUz8gEJCAwSBVpQbHVz8gEoCAkSJGU2OGQ0YmI0LTk0NDYtNDE0MS04YjhkLWE0YTQ4ZWRmZmYxOPIBKAgKEiRjOTc5ZWMzMC1mZGVkLTQ1NDUtODY5OC0xMTFlNjkzY2E5MmXyAQUICxIBNfIBCAgIEgR0cnVlggIAiALn3vCYjTKSAiAwNmRjZTA1YjRkZTY0YTFjODAwNjJiMWEzMWQ5M2I1M5oCAMoCHUxvd1N1YmplY3RpdmVMZXZlbFdlaWdodFJ1bGUyygIXWnBsdXNHclNjb3JlV2VpZ2h0UnVsZTHKAg5DdXJyZW5jeVJhbmtlcsoCDnNsb3RJbnNlcnRSdWxl2gIOUHJvbW90aW9uRXh0cmHoAgH6AgtOT1JNQUxfRkxPV4oDIGIwMTZkMDJhMWZkMDQ5MTBhYzIyMjI3NDQ0YzYwYmZhmgMNCgJ2MBAAGgVvdGhlcqgD440C2AMA+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAYgEAJIEBVpQbHVzmgQBMaAEAKgEALAEALoEBm1hbnVhbMIEAzE1NcgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAACyljT+BBXD9mgtpAUlAiQUW8eVyxj6tP5IFAJoFA2RmdKIFA2RmdLIFATG5BafLNNcH3gZA0AUA4AUA6AUA8AUFkAYAkgIkCgkyNDI5MTUyODESCTY5NjUzMzY2OBgHIgpJTUFHRV9URVhU",
      "action_card": false,
      "promotion_extra": "{\"is_card\":true,\"id\":\"3199812\",\"topstory_info\":\"bid=226.56567678233995&pctr=0.018447697162628174&price=0&pv_id=e68d4bb4-9446-4141-8b8d-a4a48edfff18\",\"parameters\":\"plugcb=https%3A%2F%2Fsugar.zhihu.com%2Fplutus_adreaper_callback%3Fcid%3D3199812%26ccid%3D1341187%26zoneid%3D10012%26adid%3D3268466%26sid%3De68d4bb4-9446-4141-8b8d-a4a48edfff18%26adsource%3Dzhi_plus%26ocpxs%3D1%26ocpxp%3D2000%26dynamictitle%3D0%26mixinfo%3D__MIX__INFO__%26campaignid%3D2302344%26cbed%3DDyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg%3D%3D%26cmixid%3D%26cmixvs%3D%26isnative%3Dfalse\",\"sign\":\"7ce87673-153d-4d0e-af2a-f884f9ab658c\",\"mobile_experiment\":null,\"new_asset\":\"\",\"click_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEEKVQqOSuIYIdBvEo7Wg==\"],\"view_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEEPFEmLWm8-o_znDYB\"],\"view_x_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEEPFkvMyQRUT0SUjjPgwqNSpceEg==\",\"https://sugar.zhihu.com/ad-track/zplus_log?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEEPFEmLR820zpS4V8L1jE=\"],\"deliver_x_tracks\":[\"http://proxy-ad-track-zplus:10000/ad-track/zplus_log?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEELl0vMzYrVw0fll1t8qj4XUE=\"],\"impression_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEEI1UzKCU9VjsIXwyIzIulhGWC\"],\"conversion_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEEKVctLCU8VjsIX1u2KBLeP1SB\"],\"topstory_tracks\":[\"http://proxy-ad-track-zplus-bid:10000/ad-track/zplus/bid?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEELF0mPh8nSzQIRYVahjjLuoY=&rki=__RANK__INFO__&fri=__FILTER__INFO__&fin=1\"],\"video_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?zk=&ri=feed-root:currency:a3b63733-227d-443a-b745-a288c63182f6&isy=__IMAGE_STYLE__&dts=1721528757&zpt=&ui=60.255.228.141&mix=__MIX__INFO__&mcdtt=0&cc=510600&cl=&iti=__IS_THREE_IMAGE__&cv=&hp=0&zpluspt=0&ar=0.021559327840805054&ed=DyZPOAVzdHB-FWJXAWB1A1x8CHwNdmlzfxRqUAhkakYJMQR6HiEqfX0UfFQJZXwHWXMKcgt6aHh6AyEIDGJqQxswUC5Lfnw1J0tvVgFgfAFbdQh6HjMoKXwYYVYBZX8JTSZVOQVlOTQ3GCIIQiRqUwQxBH8eKj0zcxV0BlMgcQBNIFo6WzBncGhHPQhFOSgNW2NaPgVyaXR_FGpQFyMlXVZ2CXsMemt0fBZnVQlodAFdfAh4HiA-NDoYYkFYM3EBTT9JJk0wKjRzFXQEWG1-BFl8CH8Ke2tmIUYiH0JtfRYEJkkyXyw7LHMUZ0FSNDhZVncNeAFyb3J2FHQLRDlxCV91CH0JdGl0aEoxF0kgcQJbdQlsWys4fX4DMx1YbX0AW3QLbFsxM319FGteCWF-FgozUHcOcWN3exx0BlhtfwJdfQ18DmU5ISAYNAZdIykWCiNYKQVmbQJrF2AFXj84FVl3HHl5cn9yDQBgVVI_P0Q0I1gpTCwoZXwXd1RwYWkCKGALeF0gKiNrF2BCAhF9FVkGHHgKLy4yaxdgQgIRfB5SfQF6AHdreXkVZlMCZ34GTnd6bwpxNjQ8ej4IVjk4FVl3HHl5d3R0fxJrVwNpeAZfcgt7Dnt_cg0AYFVeMzxTNCdfbwpxf3MPFHxWA2N_AF58CHMJdWpxeRVmQgMTaQJZMlwjXysuJSp6NAZSJCNCTncLbwsCa2V5YXQEVSQ_DVtjWitRfmhzfhdhUwV2L18YeAp7FnNtcXwXY14AYnwAU3wIbEgxM31_F2tRCWR_Fhk1SyMFcmtwfx1jQVQzPFMfeAlsTjkzfX4DPQRHInEARXUIeQF1Y3l7EmpVCWV-AVx3AGxLKmcleB02U1MyeB1ScQ18FXdrdH8IagUJNGFRXyQNcl0nPCYoFGpBUCInDVpZE5cLXYRTQg==&cla=1&tev=0&cmi=&cmv=&zri=-8346498983851305707&pt=3&mcdti=0&at=CjEEPFEnPy8RVT4GSP2lJbJWhW_G\"],\"video_play_tracks\":null,\"debug_tracks\":null,\"view_as_click_tm\":5}"
    }, {
      "id": "27_1721528758.161",
      "type": "feed",
      "offset": 27,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528758,
      "updated_time": 1721528758,
      "target": {
        "id": 3478528125,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3478528125",
        "author": {
          "id": "2357a360c8062b9acefd1957801305a1",
          "url": "https://api.zhihu.com/people/2357a360c8062b9acefd1957801305a1",
          "user_type": "people",
          "url_token": "55577glju",
          "name": "55577glju",
          "headline": "",
          "avatar_url": "https://picx.zhimg.com/50/v2-5fc67a2efe2e8f52b40fac8a80da1442_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 74,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1714043684,
        "updated_time": 1714043915,
        "voteup_count": 4305,
        "thanks_count": 194,
        "comment_count": 179,
        "is_copyable": true,
        "question": {
          "id": 646378922,
          "type": "question",
          "url": "https://api.zhihu.com/questions/646378922",
          "author": {
            "id": "d9c7e2838e875f8d7650c342c5d10ea6",
            "url": "https://api.zhihu.com/people/d9c7e2838e875f8d7650c342c5d10ea6",
            "user_type": "people",
            "url_token": "sunshine-24-55-68",
            "name": "sunshine",
            "headline": "",
            "avatar_url": "https://picx.zhimg.com/50/v2-c4519a7485bd26cced0b2ef0c71f9a5e_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 0,
            "badge": [{
              "type": "identity_people",
              "description": "互联网行业 应用开发工程师"
            }],
            "followers_count": 2,
            "is_following": false,
            "is_followed": false
          },
          "title": "为什么90%的人会选择图二？",
          "created": 1709163169,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 226,
          "bound_topic_ids": [10776, 12731, 25009, 28217],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "图1是一种苦苦支撑的美，就像靠贷款维持体面的男人。",
        "excerpt_new": "图1是一种苦苦支撑的美，就像靠贷款维持体面的男人。",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"FS7jZwY6\">图1是一种苦苦支撑的美，就像靠贷款维持体面的男人。</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 1984415,
        "favorite_count": 292,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3478528125}",
      "attached_info": "Cu0ECJWqiavV7NGVjAEQBBoJNjYyNTMyNTczIKT2qLEGKNEhMLMBQBtKKAoTVFNfU09VUkNFX0ZFRURSRV9WOBIBMBgAIAA6CnsicmF3IjoiIn1aCTEwNTkxNzQzN2IgNDcyNDQyNzAxMzE3OGM3MTQ1YjZmNTdiY2M2MmY1MWFyCjM0Nzg1MjgxMjWKAQk2NDYzNzg5MjKqAQlyZWNvbW1lbmTCASAyMzU3YTM2MGM4MDYyYjlhY2VmZDE5NTc4MDEzMDVhMfIBCggMEgZOb3JtYWzyASgIChIkODdkNmEwY2EtMGRiMi00OWE2LWFmY2MtNGNhNGQyMDMyNTgz8gEFCAsSATWCAgCIAufe8JiNMpICIDIzNTdhMzYwYzgwNjJiOWFjZWZkMTk1NzgwMTMwNWExmgIAygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCE1RTX1NPVVJDRV9GRUVEUkVfVjjoAgL6AgtOT1JNQUxfRkxPV4oDIGIwMTZkMDJhMWZkMDQ5MTBhYzIyMjI3NDQ0YzYwYmZhmgMNCgJ2MBAAGgVvdGhlcqgDn4952AMA6gMJZmVlZHJlX3Y4+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAIzMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAYBh6wT+BBQAAAAAAAAAAiQUW8eVyxj6tP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUFkAYAkgIlCgk2NjI1MzI1NzMSCjM0Nzg1MjgxMjUYBCIKSU1BR0VfVEVYVA==",
      "action_card": false
    }, {
      "id": "28_1721528758.143",
      "type": "feed",
      "offset": 28,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528758,
      "updated_time": 1721528758,
      "target": {
        "id": 3337671581,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3337671581",
        "author": {
          "id": "893217b60f1e49f0bd1cb779c609b81f",
          "url": "https://api.zhihu.com/people/893217b60f1e49f0bd1cb779c609b81f",
          "user_type": "people",
          "url_token": "jia-zhi-yong-19",
          "name": "Yi顿",
          "headline": "产品设计师",
          "avatar_url": "https://pica.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          "is_org": false,
          "gender": -1,
          "followers_count": 35,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1703476679,
        "updated_time": 1703476679,
        "voteup_count": 13482,
        "thanks_count": 377,
        "comment_count": 334,
        "is_copyable": true,
        "question": {
          "id": 601605406,
          "type": "question",
          "url": "https://api.zhihu.com/questions/601605406",
          "author": {
            "id": "b9840c983f4f7e7aedb10e6b0ad126fc",
            "url": "https://api.zhihu.com/people/b9840c983f4f7e7aedb10e6b0ad126fc",
            "user_type": "people",
            "url_token": "qiu-sheng-23-64",
            "name": "秋生",
            "headline": "秋天见。",
            "avatar_url": "https://picx.zhimg.com/50/v2-30fd59dc505e7275f2d955c2169a6195_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 0,
            "followers_count": 252,
            "is_following": false,
            "is_followed": false
          },
          "title": "为什么谷爱凌样样优秀，而我的孩子一样都不行？",
          "created": 1684358590,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 68,
          "bound_topic_ids": [4719, 7099, 567903],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "谷爱凌滑雪三年的训练花费800万，不知道你的孩子训练花费多少？",
        "excerpt_new": "谷爱凌滑雪三年的训练花费800万，不知道你的孩子训练花费多少？",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"U6wuKEzq\">谷爱凌滑雪三年的训练花费800万，不知道你的孩子训练花费多少？</p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 370502,
        "favorite_count": 433,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3337671581}",
      "attached_info": "CooFCJWqiavV7NGVjAEQBBoJNjM2OTI3Mzk5IMf7o6wGKKppMM4CQBxKKAoTVFNfU09VUkNFX0ZFRURSRV9WOBIBMBgAIAA6CnsicmF3IjoiIn1aCDk1OTcwNTMwYiA0NzI0NDI3MDEzMTc4YzcxNDViNmY1N2JjYzYyZjUxYXIKMzMzNzY3MTU4MYoBCTYwMTYwNTQwNqoBCXJlY29tbWVuZMIBIDg5MzIxN2I2MGYxZTQ5ZjBiZDFjYjc3OWM2MDliODFm8gEKCAwSBk5vcm1hbPIBKAgKEiQ4NWM3OGYxZS1kMjY1LTQwY2YtYjFlOC05ZDAwODNjYzA3YzDyAQUICxIBNYICAIgC597wmI0ykgIgODkzMjE3YjYwZjFlNDlmMGJkMWNiNzc5YzYwOWI4MWaaAgDKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxl2gITVFNfU09VUkNFX0ZFRURSRV9WOOgCAvoCC05PUk1BTF9GTE9XigMgYjAxNmQwMmExZmQwNDkxMGFjMjIyMjc0NDRjNjBiZmGaAw0KAnYwEAAaBW90aGVyqAPGzhbYAwDqAwlmZWVkcmVfdjj6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAjMwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAAAAeHi9P4EFAAAAAAAAAACJBRbx5XLGPq0/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQWQBgCSAiUKCTYzNjkyNzM5ORIKMzMzNzY3MTU4MRgEIgpJTUFHRV9URVhU",
      "action_card": false
    }, {
      "id": "29_1721528758.918",
      "type": "feed",
      "offset": 29,
      "verb": "TOPIC_ACKNOWLEDGED_ARTICLE",
      "created_time": 1721528758,
      "updated_time": 1721528758,
      "target": {
        "id": 709953121,
        "type": "article",
        "url": "https://api.zhihu.com/articles/709953121",
        "author": {
          "id": "d69340422ddc5d2245489e3a49ea8720",
          "url": "https://api.zhihu.com/people/d69340422ddc5d2245489e3a49ea8720",
          "user_type": "people",
          "url_token": "shen-cong-89",
          "name": "神聪程序",
          "headline": "",
          "avatar_url": "https://pic1.zhimg.com/50/v2-33ea283f0de98bd6b8e8b6d170ee8598_l.jpg?source=b6762063",
          "is_org": false,
          "gender": -1,
          "followers_count": 7,
          "is_following": false,
          "is_followed": false
        },
        "title": "基于SpringBoot+Vue的校园交友网站(带1w+文档)",
        "image_url": "https://picx.zhimg.com/v2-15ef4074953461044c1baf0125893b47_720w.jpg?source=7e7ef6e2",
        "comment_permission": "all",
        "created": 1721463233,
        "updated": 1721463233,
        "voteup_count": 1,
        "voting": 0,
        "comment_count": 0,
        "linkbox": {
          "category": "",
          "pic": "",
          "title": "",
          "url": ""
        },
        "excerpt": "基于SpringBoot+Vue的校园交友网站(带1w+文档) [视频] 校园交友网站是校园交友管理的系统，它主要包括对首页、个人中心、用户管理、线下活动管理、交友信息管理、活动报名管理、交流论坛、系统管理等功能进行管理。可使校园交友管理的运营成本降到最低，提高经济效率。 项目简介基于SpringBoot+Vue的校园交友网站(带1w+文档)本项目可供学习参考，商业慎用项目带完整+1w+文档附带配置文档说明+部署视频   技术工具IntelliJ IDEA/Eclipse Mys…",
        "excerpt_new": "基于SpringBoot+Vue的校园交友网站(带1w+文档) [视频] 校园交友网站是校园交友管理的系统，它主要包括对首页、个人中心、用户管理、线下活动管理、交友信息管理、活动报名管理、交流论坛、系统管理等功能进行管理。可使校园交友管理的运营成本降到最低，提高经济效率。 项目简介基于SpringBoot+Vue的校园交友网站(带1w+文档)本项目可供学习参考，商业慎用项目带完整+1w+文档附带配置文档说明+部署视频   技术工具IntelliJ IDEA/Eclipse Mys…",
        "preview_type": "default",
        "preview_text": "",
        "content": "<h2>基于SpringBoot+Vue的校园交友网站(带1w+文档)</h2><a class=\"video-box\" href=\"https://link.zhihu.com/?target=https%3A//www.zhihu.com/video/1798027416708464641\" target=\"_blank\" data-video-id=\"\" data-video-playable=\"true\" data-name=\"\" data-poster=\"https://picx.zhimg.com/v2-dbbfcd8eb2f5bd1cfd85171fcb4ba3f5.jpg?source=382ee89a\" data-lens-id=\"1798027416708464641\"><img class=\"thumbnail\" src=\"https://picx.zhimg.com/v2-dbbfcd8eb2f5bd1cfd85171fcb4ba3f5.jpg?source=382ee89a\"/><span class=\"content\"><span class=\"title\"><span class=\"z-ico-extern-gray\"></span><span class=\"z-ico-extern-blue\"></span></span><span class=\"url\"><span class=\"z-ico-video\"></span>https://www.zhihu.com/video/1798027416708464641</span></span></a><blockquote data-pid=\"8IGtfl5h\"> 校园交友网站是校园交友管理的系统，它主要包括对首页、个人中心、用户管理、线下活动管理、交友信息管理、活动报名管理、交流论坛、系统管理等功能进行管理。可使校园交友管理的运营成本降到最低，提高经济效率。<br/> </blockquote><h2>项目简介</h2><ul><li data-pid=\"LjtqyvV0\">基于SpringBoot+Vue的<b>校园交友网站</b>(带1w+文档)</li><li data-pid=\"TfmvLpg5\">本项目<b>可供学习参考</b>，商业慎用</li><li data-pid=\"VustY0OC\">项目带完整+<b>1w+文档</b>附带配置文档说明+<b>部署视频</b></li></ul><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-2e6b6fca4c6e22fc726bb4b2be11e2b7_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"395\" data-original-token=\"v2-972b066eba4f1c1688328a63989352f9\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://picx.zhimg.com/v2-2e6b6fca4c6e22fc726bb4b2be11e2b7_r.jpg\"/></figure><h2>技术工具</h2><ul><li data-pid=\"Q5IR32OW\">IntelliJ IDEA/Eclipse<br/> </li><li data-pid=\"4Q9x7Itm\">Mysql<br/> </li><li data-pid=\"X6pwkWrO\">JDK 1.8<br/> </li></ul><h2>功能特点</h2><p data-pid=\"KgQyrRYC\">为了更好的去理清本系统整体思路，对该系统以结构图的形式表达出来，设计实现该数码论坛系统的功能结构图如下所示：</p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-7b3f588113e61c9e647404b8837c3ffc_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"688\" data-rawheight=\"682\" data-original-token=\"v2-de2bd02e81051a86414b2bea075390c5\" class=\"origin_image zh-lightbox-thumb\" width=\"688\" data-original=\"https://pic1.zhimg.com/v2-7b3f588113e61c9e647404b8837c3ffc_r.jpg\"/></figure><h2>代码结构</h2><div class=\"highlight\"><pre><code class=\"language-text\">├──.mvn\n│  └──wrapper\n├──db\n├──src\n│  ├──main\n│  │  ├──java\n│  │  │  └──com\n│  │  │     ├──annotation\n│  │  │     ├──config\n│  │  │     ├──controller\n│  │  │     ├──dao\n│  │  │     ├──entity\n│  │  │     │  ├──model\n│  │  │     │  ├──view\n│  │  │     │  └──vo\n│  │  │     ├──interceptor\n│  │  │     ├──service\n│  │  │     │  └──impl\n│  │  │     └──utils\n│  │  └──resources\n│  │     ├──admin\n│  │     │  └──admin\n│  │     │     ├──dist\n│  │     │     ├──public\n│  │     │     └──src\n│  │     ├──front\n│  │     │  └──front\n│  │     │     ├──css\n│  │     │     ├──elementui\n│  │     │     ├──img\n│  │     │     ├──js\n│  │     │     ├──layui\n│  │     │     ├──modules\n│  │     │     ├──pages\n│  │     │     └──xznstatic\n│  │     ├──mapper\n│  │     └──static\n│  │        └──upload\n│  └──test\n│     └──java\n│        └──com\n└──target\n</code></pre></div><h2>运行截图</h2><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-2e6b6fca4c6e22fc726bb4b2be11e2b7_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"395\" data-original-token=\"v2-972b066eba4f1c1688328a63989352f9\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://picx.zhimg.com/v2-2e6b6fca4c6e22fc726bb4b2be11e2b7_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-6a5417700dcec86db5fed94984e2bd6e_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"395\" data-original-token=\"v2-7b27638b8423185eed90b93408cbe417\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://pica.zhimg.com/v2-6a5417700dcec86db5fed94984e2bd6e_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-d4cea1408d6c3d0e9291b6875b5dabf5_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"329\" data-original-token=\"v2-b7ad377fc0bc63c7c44d6f1314d8cf1e\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://pic4.zhimg.com/v2-d4cea1408d6c3d0e9291b6875b5dabf5_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-5bf8735623d5acc4205f1b8fb7fd60df_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"350\" data-original-token=\"v2-00bdd114983159130a7e72c1fd9840c7\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://picx.zhimg.com/v2-5bf8735623d5acc4205f1b8fb7fd60df_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-aa150f49c65b1a326e1b78a8a6baf644_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"383\" data-original-token=\"v2-04358a5ed061a0c728e29b0f3cd44d91\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://pic1.zhimg.com/v2-aa150f49c65b1a326e1b78a8a6baf644_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-db437d362b79974330a134d2fc4b2ef9_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"366\" data-original-token=\"v2-f564c24403c6d4e5f077df0fa642d417\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://pic4.zhimg.com/v2-db437d362b79974330a134d2fc4b2ef9_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-c3ee683a0b099590cd5e9f6bc110468b_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"371\" data-original-token=\"v2-ea38566389d2399d27bf8048199fa677\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://picx.zhimg.com/v2-c3ee683a0b099590cd5e9f6bc110468b_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-a915c78146fd09984cc477e0fb481a8a_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"831\" data-rawheight=\"371\" data-original-token=\"v2-d8eb6267a7dd7eb8c761db66b62da7ba\" class=\"origin_image zh-lightbox-thumb\" width=\"831\" data-original=\"https://pica.zhimg.com/v2-a915c78146fd09984cc477e0fb481a8a_r.jpg\"/></figure><h2>文档目录截图</h2><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-94aa6ab38217585233794c8f34ba6375_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"693\" data-rawheight=\"906\" data-original-token=\"v2-31c8ce26df45104705c333f7d147d775\" class=\"origin_image zh-lightbox-thumb\" width=\"693\" data-original=\"https://pic2.zhimg.com/v2-94aa6ab38217585233794c8f34ba6375_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-2e9a99e5c9f4a20d2e66b227aaeb2445_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"364\" data-rawheight=\"982\" data-original-token=\"v2-c382c477ea6ef7b2245d99d0d9372aa0\" class=\"content_image\" width=\"364\"/></figure><h2>说明</h2><p data-pid=\"tKnKB8OW\">本项目属于源码，不包部署，需要有编码基础，百度网盘发货，项目只供学习，禁止非法用途。</p><h2>演示视频</h2><p data-pid=\"nKajr87D\"><b><a href=\"https://link.zhihu.com/?target=https%3A//space.bilibili.com/44659715\" class=\" external\" target=\"_blank\" rel=\"nofollow noreferrer\"><span class=\"invisible\">https://</span><span class=\"visible\">space.bilibili.com/4465</span><span class=\"invisible\">9715</span><span class=\"ellipsis\"></span></a></b></p><h2>定制联系我们神聪程序</h2>",
        "is_labeled": true,
        "visited_count": 12,
        "thumbnails": ["https://picx.zhimg.com/v2-15ef4074953461044c1baf0125893b47_720w.jpg?source=7e7ef6e2", "https://picx.zhimg.com/v2-dbbfcd8eb2f5bd1cfd85171fcb4ba3f5_720w.jpg?source=7e7ef6e2", "https://picx.zhimg.com/50/v2-cd12a6cde6ae51256ec04c1adf96620f_720w.jpg?source=b6762063", "https://pica.zhimg.com/50/v2-95efc6810a74fd0acd88d7493e29475f_720w.jpg?source=b6762063"],
        "favorite_count": 0
      },
      "brief": "{\"source\": \"TS\", \"type\": \"article\", \"id\": 709953121}",
      "attached_info": "Cr4FCJWqiavV7NGVjAEQBxoJMjQ1ODk5MDk2IMHj7bQGKAEwAEAdSiQKGVRTX1NPVVJDRV9XQVJNX1VQX05PUk1BTDISATAYACAAOgBiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgk3MDk5NTMxMjGCAVNodHRwczovL3BpY3guemhpbWcuY29tL3YyLTE1ZWY0MDc0OTUzNDYxMDQ0YzFiYWYwMTI1ODkzYjQ3XzcyMHcuanBnP3NvdXJjZT03ZTdlZjZlMqoBCXJlY29tbWVuZMIBIGQ2OTM0MDQyMmRkYzVkMjI0NTQ4OWUzYTQ5ZWE4NzIw8gEKCAwSBk5vcm1hbPIBKAgKEiQzZGI1Y2FiMS1kZWJlLTQ3ZWYtOGQ5Mi00OGQ1YTg4YjQ4YTXyAQUICxIBNYICAIgC597wmI0ykgIgZDY5MzQwNDIyZGRjNWQyMjQ1NDg5ZTNhNDllYTg3MjCaAgDKAhhDb250ZW50V2FybVVwQnJlYWtJblJ1bGXaAhlUU19TT1VSQ0VfV0FSTV9VUF9OT1JNQUwy6AIC+gILTk9STUFMX0ZMT1eKAyBiMDE2ZDAyYTFmZDA0OTEwYWMyMjIyNzQ0NGM2MGJmYZoDDQoCdjAQABoFb3RoZXKoAwzYAwDqAx90ZXh0XzEyaG91cl91bmlmaW5zaGVkX3JlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAJhacIEAzQwMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAAAQjmj+BBQAAAAAAAAAAiQUW8eVyxj6tP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUFkAYAkgIkCgkyNDU4OTkwOTYSCTcwOTk1MzEyMRgHIgpJTUFHRV9URVhU",
      "action_card": false
    }];
    const list5 = [{
      "id": "30_1721528759.562",
      "type": "feed",
      "offset": 30,
      "verb": "TOPIC_ACKNOWLEDGED_ARTICLE",
      "created_time": 1721528759,
      "updated_time": 1721528759,
      "target": {
        "id": 694820278,
        "type": "article",
        "url": "https://api.zhihu.com/articles/694820278",
        "author": {
          "id": "3490c46edf404b00c35aa9eb5117f863",
          "url": "https://api.zhihu.com/people/3490c46edf404b00c35aa9eb5117f863",
          "user_type": "people",
          "url_token": "ning-meng-qi-shui-78-84",
          "name": "柠檬汽水",
          "headline": "一位自我评价比较专业的美妆小仙女～",
          "avatar_url": "https://pic1.zhimg.com/50/v2-d962f1f01701f600eb602bd9e9e43caf_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 0,
          "followers_count": 17028,
          "is_following": false,
          "is_followed": false
        },
        "title": "去医院看减肥会丢人吗？？",
        "comment_permission": "all",
        "created": 1714182181,
        "updated": 1721197453,
        "voteup_count": 2429,
        "voting": 0,
        "comment_count": 499,
        "linkbox": {
          "category": "",
          "pic": "",
          "title": "",
          "url": ""
        },
        "excerpt": "不觉得！我就是去医院瘦了50斤！不需要切胃，就靠吃那种促进脂肪分解和提升代谢的胶囊，4个月瘦了50斤！整个过程没有头晕眼花，也不呕吐更不会拉肚子，反而更健康了医院不比网上那些三无产品有权威有保障",
        "excerpt_new": "不觉得！我就是去医院瘦了50斤！不需要切胃，就靠吃那种促进脂肪分解和提升代谢的胶囊，4个月瘦了50斤！整个过程没有头晕眼花，也不呕吐更不会拉肚子，反而更健康了医院不比网上那些三无产品有权威有保障",
        "preview_type": "default",
        "preview_text": "",
        "content": "<p data-pid=\"LDuCZ2QR\"><b>真无语，医院能让你又快，又健健康康瘦下来，有什么丢人的！！</b><br/><br/>我就是去了河南中医院开了降脂轻身胶囊，<b>吃了4瓶直接从160到110（没反弹啊！！）</b></p><p data-pid=\"MPSmKGv6\">比硬抗挨饿，吃什么益生菌，减*药啥的效果强100倍</p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-65f8fb5647f11abe25ee504b9087faba_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"3276\" data-rawheight=\"2184\" data-original-token=\"v2-2e3054c47a813d747f419fdbb7a30ad0\" class=\"origin_image zh-lightbox-thumb\" width=\"3276\" data-original=\"https://pic3.zhimg.com/v2-65f8fb5647f11abe25ee504b9087faba_r.jpg\"/></figure><p data-pid=\"XZHAYg6P\"><b>我敢说，70%的人都没我用的减肥方法多</b><br/><br/><b>试过断碳，21天减重法、生酮以及节食等</b>，每次一到晚上就给我饿的眼冒金星，最后直接美团外送2只叫了只鸡！<br/>一周努力又白费！<br/><br/>肯定会有个别人说我懒，不运动，我想说我160啊，md运动2天脚踝直接废了，膝盖还疼，真的难上加难</p><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-cbadd01c9807fd867d5b606e4eda6273_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"720\" data-rawheight=\"927\" data-original-token=\"v2-08b1194b8b24272714c4035d1b54bed4\" class=\"origin_image zh-lightbox-thumb\" width=\"720\" data-original=\"https://pic2.zhimg.com/v2-cbadd01c9807fd867d5b606e4eda6273_r.jpg\"/></figure><p data-pid=\"fg01Q4dd\"><br/><b>所以我能在4个月瘦50斤，靠的不是我坚强的毅力，而且我遇到了好医生</b></p><p data-pid=\"P9Uax65z\"><br/><br/>因为去年在抖音刷到郑州中医院研发出<b>降脂轻身胶囊，说是能快速瘦又不伤身体</b>  这不撞枪口上了，我真的好心动！！</p><p data-pid=\"lg7oICTI\">而且评论区下面铺天盖地的都再说好用，并且说已经不好买，每天还限量</p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-53674cdfc0803f0b117f24d7a9dbcc7e_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"720\" data-rawheight=\"1101\" data-original-token=\"v2-03414e9c33c1eab5dbec672c5d6dbd25\" class=\"origin_image zh-lightbox-thumb\" width=\"720\" data-original=\"https://pic3.zhimg.com/v2-53674cdfc0803f0b117f24d7a9dbcc7e_r.jpg\"/></figure><p data-pid=\"ufi3jeHB\"><br/>是的，我抗不下去了，直接在网上挂了河南中医院的号<br/><br/>去的很早，结果排队排了2个月小时，终于进了诊室</p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-785e8db0ee958c04756e30b383b5958c_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"720\" data-rawheight=\"946\" data-original-token=\"v2-b8fcf4a92aeca269b6c118b9927bd041\" class=\"origin_image zh-lightbox-thumb\" width=\"720\" data-original=\"https://pic1.zhimg.com/v2-785e8db0ee958c04756e30b383b5958c_r.jpg\"/></figure><p data-pid=\"a-cpmOnJ\"><br/><br/>当时一进诊室我就忍不住跟医生吐槽：<br/><br/>医生，我这种<b>易胖体质，喝凉水都胖，减肥真的好累好难，我该怎么办？</b><br/><br/><b>医生原话，</b><br/><br/><b>世上哪有什么易胖体质！！只不过身体代谢跟不上罢了</b><br/><br/>对于我这种大基数患者，身体内顽固脂肪多，之所以用各种方法都减不下去，是因为根本没有消耗到脂肪<br/>平时吃的那些减肥产品减的也只是水分，<b>并没有真正分解皮下脂肪，所以迟迟瘦不下来</b><br/><br/><b>医生也给了方法；</b><br/><br/>1、无需花钱，运动30分钟以上，搭配健康饮食，每天可消耗500大卡，坚持1个月可瘦10斤（前提要吃的健康，不然白运动）<br/><br/>2、花钱小钱，用医院的降脂胶囊，正常吃饭，可以搭配运动也可以不运动，一个月瘦15斤<br/><br/>我来就是奔着这个降脂胶囊的，当然选第二种了<br/><br/>按照医生说的，降职胶囊里面是含有<b>类黄酮可以阻断食物中的糖分和热量分解，从一定程度上保证你不再长胖，</b><br/>之后利用里面的<b>国家专利成分左旋肉碱，加速脂肪代谢燃烧，提高自身运动排脂水平，让减肥不困难，更容易出效果</b><br/><br/>我也找到了一些证据：</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-e51d7c082b6b769a84fd947126940d99_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"720\" data-rawheight=\"503\" data-original-token=\"v2-3a03ae29bbef9894ed0ffedb5eb63bf8\" class=\"origin_image zh-lightbox-thumb\" width=\"720\" data-original=\"https://picx.zhimg.com/v2-e51d7c082b6b769a84fd947126940d99_r.jpg\"/></figure><p data-pid=\"Y7Qo8Y5U\">不得不说我对它好感逐渐增加，光是听医生讲这些就已经很激动了<br/><br/>也不知道是不是医生通病，一说就停不下来，巴拉巴拉说了好多的，<br/><br/>最后是给我拿了3瓶这个胶囊，嘱咐我一定要坚持吃</p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-9d0e5b5d34bd98fc429db1d85b593cce_b.jpg\" data-size=\"normal\" data-rawwidth=\"720\" data-rawheight=\"960\" data-original-token=\"v2-57f60d9a89edb22a702ceeb40436b505\" class=\"origin_image zh-lightbox-thumb\" width=\"720\" data-original=\"https://pic3.zhimg.com/v2-9d0e5b5d34bd98fc429db1d85b593cce_r.jpg\"/><figcaption>其实线上也有直营店，我也是后来才知道</figcaption></figure><p data-pid=\"6szEF08J\"><b>这里特别说下，</b><br/><br/>医生提别强调了，现在太多医代，其实很多拿货渠道都不是官方渠道，不能保证真假，<br/><br/>而且真正能在药店yy的减肥产品是必要的要有<b>蓝帽</b>的，经过药监局审核认证的，允许把“<b>减肥”</b>两个字印在瓶身<br/><br/>上的，虽然贵一点，但却是真正有效的。<br/><br/></p><p data-pid=\"Hee66wko\"><b>omg，医生真的太为我们胖子着想了吧。</b><br/><br/>我最开始<b>吃了半个月</b>，明显感受到肚子小了一圈</p><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-40edfe1b6f17dd7d025446c77cf10ac2_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1280\" data-rawheight=\"853\" data-original-token=\"v2-b8e676c1bc1cfe762c2b9cfbf7fad37e\" class=\"origin_image zh-lightbox-thumb\" width=\"1280\" data-original=\"https://pica.zhimg.com/v2-40edfe1b6f17dd7d025446c77cf10ac2_r.jpg\"/></figure><p data-pid=\"Jqqs_lk_\"><br/>之后就每天早晚饭后吃1粒，平时晚上吃完饭散步半个小时，体重真的嗖嗖的掉</p><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-8f300ab5a1654e23a951e45d34a6d477_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"628\" data-rawheight=\"312\" data-original-token=\"v2-722d99b7f5740645ad85c7338d781689\" class=\"origin_image zh-lightbox-thumb\" width=\"628\" data-original=\"https://pic2.zhimg.com/v2-8f300ab5a1654e23a951e45d34a6d477_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-eb4dc289f2c90eb45416764e97f925f7_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"600\" data-rawheight=\"306\" data-original-token=\"v2-747f15d7c6ca5adf1692742593af096f\" class=\"origin_image zh-lightbox-thumb\" width=\"600\" data-original=\"https://picx.zhimg.com/v2-eb4dc289f2c90eb45416764e97f925f7_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-8958b959652e4d5442face0f5d2a5f34_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"619\" data-rawheight=\"308\" data-original-token=\"v2-126d9c4c29d58f790d34212ef7aa1797\" class=\"origin_image zh-lightbox-thumb\" width=\"619\" data-original=\"https://pica.zhimg.com/v2-8958b959652e4d5442face0f5d2a5f34_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-3d47a92596c79329e2a40649373178c3_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"618\" data-rawheight=\"314\" data-original-token=\"v2-2a57448b0ff709a41b50dfaebd46a43f\" class=\"origin_image zh-lightbox-thumb\" width=\"618\" data-original=\"https://pic2.zhimg.com/v2-3d47a92596c79329e2a40649373178c3_r.jpg\"/></figure><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-220de16c57a77356521804aa89c9615b_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"614\" data-rawheight=\"306\" data-original-token=\"v2-2c97c0c39916ee1ecd161ef023ad0d21\" class=\"origin_image zh-lightbox-thumb\" width=\"614\" data-original=\"https://picx.zhimg.com/v2-220de16c57a77356521804aa89c9615b_r.jpg\"/></figure><p data-pid=\"seTJPjFm\"><br/>效果是越吃越好，而且我没有很剧烈的运动，<br/><br/><b>每天就是晚饭后吃2粒，然后慢走半个小时</b>，明显感到胳膊腿上的赘肉越少，一些其它脂肪过高的小毛病也都被改善了<br/><br/><b>最后拢共吃了有3瓶，体重已经到达我满意的程度 </b></p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-88a9f38b953542fef4f5847bead25887_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1107\" data-rawheight=\"1593\" data-original-token=\"v2-8986d4e3ae91b9c19946e1016ef81505\" class=\"origin_image zh-lightbox-thumb\" width=\"1107\" data-original=\"https://pic4.zhimg.com/v2-88a9f38b953542fef4f5847bead25887_r.jpg\"/></figure><p data-pid=\"SwpqN2p7\">整个过程我就每天正常吃饭，8分饱，不要吃撑，然后就坚持吃降脂轻神胶囊，很轻松的就瘦了<br/><br/><b>真的比我用节食，高强度运动等效果好太多了！</b><br/><br/>并且像这种院线产品，效果是一方面，安全也是有保证的</p><p data-pid=\"4h2BTI8r\"><b>因为它是中科院研究的研发的，受食品药品监督管理局统一监管，该有的备案、人体检测、证书一个不会少！</b><br/><br/>我自己用了效果好，所以我敢发誓，也敢对我以上所说负责， 我是真的不想在看到很多姐妹为了减肥被那些无良商家伤害身体，所以有好的我就一定会分享的<br/><br/><br/>以上仅为我个人使用体验，保健食品不是药物，不能代替药物治疗疾病<br/><br/><br/><br/>---------被迫更新<br/><br/>最近后台有很多说自己几十块在pdd卖了吃完身体不舒服，天爷啊！！你们怎么敢啊！！<br/>我再说一遍，看准<b>小蓝帽，以及包装有无减肥二字！！</b></p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-ea1343ebf125772df1eece00e92a56c3_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"600\" data-rawheight=\"404\" data-original-token=\"v2-825b645b0baf512f29ce1da3334309c4\" class=\"origin_image zh-lightbox-thumb\" width=\"600\" data-original=\"https://pic4.zhimg.com/v2-ea1343ebf125772df1eece00e92a56c3_r.jpg\"/></figure><p data-pid=\"SCQeL1RB\">想了解的你们可以保存一下，自己去药店，医院和线上医疗店铺看看</p><p data-pid=\"7hbJF4ch\">---</p><p data-pid=\"yrMDKUoN\">不用翻了，没有链接。我敢做敢当，见得了光！！<br/></p><p data-pid=\"xW_lkE2k\"><b>一些题外话</b> <br/><br/>我希望大家能够重视肥胖！！ <br/><br/> <b>因为脂肪这个东西虽然看不见摸不着，但是当体内营养过剩时，它们就会不断堆积到内脏，储蓄过多时，就会造成脂肪过剩，进入血液引发高血*、*血压、糖**、**硬化、心脏*等，一系列问题的风险。</b></p><p></p><p></p>",
        "is_labeled": false,
        "visited_count": 459703,
        "thumbnails": ["https://picx.zhimg.com/50/v2-2e3054c47a813d747f419fdbb7a30ad0_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-169b02934e600b2308d02ecf86f95a44_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-f7fb7e21c4c9b66cdd83957bd98f41c3_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-54bfadf9dbdd8d10189e283d7d6208a6_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-57f60d9a89edb22a702ceeb40436b505_720w.jpg?source=b6762063", "https://pica.zhimg.com/50/v2-b8e676c1bc1cfe762c2b9cfbf7fad37e_720w.jpg?source=b6762063", "https://pica.zhimg.com/50/v2-270ece8e3611ef78f37ae03326f73ccd_720w.jpg?source=b6762063"],
        "favorite_count": 4034
      },
      "brief": "{\"source\": \"TS\", \"type\": \"article\", \"id\": 694820278}",
      "attached_info": "Cq0FCNTkus25kc2utwEQBxoJMjQyNTM0ODI1IKWwsbEGKP0SMPMDQB5KGQoOUHJvbW90aW9uRXh0cmESATAYACAAOgBiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgk2OTQ4MjAyNziqAQlyZWNvbW1lbmTCASAzNDkwYzQ2ZWRmNDA0YjAwYzM1YWE5ZWI1MTE3Zjg2M/IBCQgMEgVaUGx1c/IBKAgJEiQ1YjlmMjA2Mi04M2ZiLTRjODItOTIyMS0zMTczMjBlZDdhY2LyASgIChIkYTE0MTM3MmItMzc4NS00ZjVkLTgwZDItNDg0Njg0YmM1OGJk8gEFCAsSATbyAQgICBIEdHJ1ZYICAIgCw+XwmI0ykgIgMzQ5MGM0NmVkZjQwNGIwMGMzNWFhOWViNTExN2Y4NjOaAgDKAh1Mb3dTdWJqZWN0aXZlTGV2ZWxXZWlnaHRSdWxlMsoCF1pwbHVzR3JTY29yZVdlaWdodFJ1bGUxygIOQ3VycmVuY3lSYW5rZXLKAg5zbG90SW5zZXJ0UnVsZdoCDlByb21vdGlvbkV4dHJh6AIB+gILTk9STUFMX0ZMT1eKAyA3ZmRiNDRlZjBmZTE0YTQ3YmI0MjM1MjhiMTdlNDA0NZoDDQoCdjAQABoFb3RoZXKoA7eHHNgDAPoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABAGIBACSBAVaUGx1c5oEATGgBACoBACwBAC6BAZtYW51YWzCBAMxNTXIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAABgPY4/gQWlherE479IQIkF0Op+QZQBsD+SBQCaBQNkZnSiBQNkZnSyBQExuQWRlVglvBkHQNAFAOAFAOgFAPAFBpAGAJICJAoJMjQyNTM0ODI1Egk2OTQ4MjAyNzgYByIKSU1BR0VfVEVYVA==",
      "action_card": false,
      "promotion_extra": "{\"is_card\":true,\"id\":\"3112260\",\"topstory_info\":\"bid=175.68305750787803&pctr=0.02114465832710266&price=0&pv_id=5b9f2062-83fb-4c82-9221-317320ed7acb\",\"parameters\":\"plugcb=https%3A%2F%2Fsugar.zhihu.com%2Fplutus_adreaper_callback%3Fcid%3D3112260%26ccid%3D1283408%26zoneid%3D10012%26adid%3D3181766%26sid%3D5b9f2062-83fb-4c82-9221-317320ed7acb%26adsource%3Dzhi_plus%26ocpxs%3D1%26ocpxp%3D3000%26dynamictitle%3D1783459337055899649%26mixinfo%3D__MIX__INFO__%26campaignid%3D2223695%26cbed%3DCCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b%26cmixid%3D%26cmixvs%3D%26isnative%3Dfalse\",\"sign\":\"59ec43a3-0fcb-4a77-a604-550ba9ab88d2\",\"mobile_experiment\":null,\"new_asset\":\"\",\"click_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmi=&mix=__MIX__INFO__&zpt=&cc=510600&cl=&ar=0.014765501022338867&iti=__IS_THREE_IMAGE__&dts=1721528758&isy=__IMAGE_STYLE__&mcdti=1783459337055899649&mcdtt=4&zk=&tev=0&cla=1&pt=3&cmv=&zri=-5233969417751186860&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&ui=60.255.228.141&hp=0&cv=&zpluspt=0&ed=CCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b&at=CjEEKVQqOSuIYIdBvEo7Wg==\"],\"view_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmi=&mix=__MIX__INFO__&zpt=&cc=510600&cl=&ar=0.014765501022338867&iti=__IS_THREE_IMAGE__&dts=1721528758&isy=__IMAGE_STYLE__&mcdti=1783459337055899649&mcdtt=4&zk=&tev=0&cla=1&pt=3&cmv=&zri=-5233969417751186860&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&ui=60.255.228.141&hp=0&cv=&zpluspt=0&ed=CCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b&at=CjEEPFEmLWm8-o_znDYB\"],\"view_x_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmi=&mix=__MIX__INFO__&zpt=&cc=510600&cl=&ar=0.014765501022338867&iti=__IS_THREE_IMAGE__&dts=1721528758&isy=__IMAGE_STYLE__&mcdti=1783459337055899649&mcdtt=4&zk=&tev=0&cla=1&pt=3&cmv=&zri=-5233969417751186860&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&ui=60.255.228.141&hp=0&cv=&zpluspt=0&ed=CCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b&at=CjEEPFEmLR820zpS4V8L1jE=\"],\"deliver_x_tracks\":[\"http://proxy-ad-track-zplus:10000/ad-track/zplus_log?cmi=&mix=__MIX__INFO__&zpt=&cc=510600&cl=&ar=0.014765501022338867&iti=__IS_THREE_IMAGE__&dts=1721528758&isy=__IMAGE_STYLE__&mcdti=1783459337055899649&mcdtt=4&zk=&tev=0&cla=1&pt=3&cmv=&zri=-5233969417751186860&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&ui=60.255.228.141&hp=0&cv=&zpluspt=0&ed=CCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b&at=CjEELl0vMzYrVw0fll1t8qj4XUE=\"],\"impression_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmi=&mix=__MIX__INFO__&zpt=&cc=510600&cl=&ar=0.014765501022338867&iti=__IS_THREE_IMAGE__&dts=1721528758&isy=__IMAGE_STYLE__&mcdti=1783459337055899649&mcdtt=4&zk=&tev=0&cla=1&pt=3&cmv=&zri=-5233969417751186860&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&ui=60.255.228.141&hp=0&cv=&zpluspt=0&ed=CCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b&at=CjEEI1UzKCU9VjsIXwyIzIulhGWC\"],\"conversion_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmi=&mix=__MIX__INFO__&zpt=&cc=510600&cl=&ar=0.014765501022338867&iti=__IS_THREE_IMAGE__&dts=1721528758&isy=__IMAGE_STYLE__&mcdti=1783459337055899649&mcdtt=4&zk=&tev=0&cla=1&pt=3&cmv=&zri=-5233969417751186860&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&ui=60.255.228.141&hp=0&cv=&zpluspt=0&ed=CCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b&at=CjEEKVctLCU8VjsIX1u2KBLeP1SB\"],\"topstory_tracks\":[\"http://proxy-ad-track-zplus-bid:10000/ad-track/zplus/bid?cmi=&mix=__MIX__INFO__&zpt=&cc=510600&cl=&ar=0.014765501022338867&iti=__IS_THREE_IMAGE__&dts=1721528758&isy=__IMAGE_STYLE__&mcdti=1783459337055899649&mcdtt=4&zk=&tev=0&cla=1&pt=3&cmv=&zri=-5233969417751186860&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&ui=60.255.228.141&hp=0&cv=&zpluspt=0&ed=CCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b&at=CjEELF0mPh8nSzQIRYVahjjLuoY=&rki=__RANK__INFO__&fri=__FILTER__INFO__&fin=1\"],\"video_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?cmi=&mix=__MIX__INFO__&zpt=&cc=510600&cl=&ar=0.014765501022338867&iti=__IS_THREE_IMAGE__&dts=1721528758&isy=__IMAGE_STYLE__&mcdti=1783459337055899649&mcdtt=4&zk=&tev=0&cla=1&pt=3&cmv=&zri=-5233969417751186860&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&ui=60.255.228.141&hp=0&cv=&zpluspt=0&ed=CCwEeAxxb3N6HWBSFzMjRFZwHylcNyl9fwMhCAxiakobKUw5SDdncGhEIAwMYWpAGSwEewtwYnl2FXQFQW14CUVxAHMJcGJ0eBFmUQNpegZNJk13CXFic3oVakFYM3EBTSRbOgVzfCMqUTtaA2R-BVhxAXgNZTs6JxhjVwFhfhYKI1gpBWZtAmsXYAVePzgVWXcceXlyf3INAGBVUj8_RDQjWClMLChlfBd3VHBhaQIoYAt4XSAqI2sXYEICEX0VWQYceAovLjJrF2BCAhF8HlJ9CX4OdGlxdxFqXwRieQROd3pvCnE2NDx6PghWOTgVWXcceXlwdHl_EGtTA2F1AltyDnwLdW1lfGZ3VQM_L0AIGlssHXFoZX1kY0kBZ3gJXXIOfwp6Y3J9FmFfFGIPFVl3Ti9RJDI0K0ENAVAzOF8ZYAt4HXAbcWsSFkFSIiUNWHQIeAp1amYtTTBaAXYpUxsmTXcIZTUjPl0iWgJgfABNKUwjBXpucH8SY1ACZGpRAngKewBybXZ4AyEOXG1hAVp0DXgBcG52dhNlVgRnfwJYch84SDEzfX8Va18GaWpTHzwEOlcwLmY7TDxaAGB8AFp1CXsOZTkhIBg0Bl0jKRYYLAR_Wno8cn4TYEoJYypSRnFacgpuY3J8FH9UAGd_AlsgXX1ZIDhmKkYkFQxgYgBbdQl6CHZpeHoVYlYGYngEXnQJcgplOzYnGGRVCGR8B00mVjkFd2NufhVmVgVnfAdSfQhyC3d8MDxMYFoAaH4JXXMfL1szOTNzFXQRSzlxAE0qWjpAMGdxaEY-FAx2JVcYeAlsTiEufX4DMQZYbX4CWXYPcw1lNSM-XTUIUDxxAV5jWyVXNzMkcxV0CFImPg1bawl7DXBueX4WYlMIZHoIUnwNex4wKjUnQSFaFzMoRB94CdYIiqxcsV6b&at=CjEEPFEnPy8RVT4GSP2lJbJWhW_G\"],\"video_play_tracks\":null,\"debug_tracks\":null,\"view_as_click_tm\":5}"
    }, {
      "id": "31_1721528759.223",
      "type": "feed",
      "offset": 31,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528759,
      "updated_time": 1721528759,
      "target": {
        "id": 3529973911,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3529973911",
        "author": {
          "id": "739d4ff7d809ed5600f7106ebc07fd95",
          "url": "https://api.zhihu.com/people/739d4ff7d809ed5600f7106ebc07fd95",
          "user_type": "people",
          "url_token": "gao-neng-da-xian-yu",
          "name": "高能大咸鱼",
          "headline": "捷径走多了，总会崴脚",
          "avatar_url": "https://picx.zhimg.com/50/v2-5db75f5ae13e0f45a4cfc1457f383960_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 1110,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1718329411,
        "updated_time": 1718329780,
        "voteup_count": 0,
        "thanks_count": 1,
        "comment_count": 13,
        "is_copyable": true,
        "question": {
          "id": 658808755,
          "type": "question",
          "url": "https://api.zhihu.com/questions/658808755",
          "author": {
            "id": "714ccbff03f702a41b64321d914f8719",
            "url": "https://api.zhihu.com/people/714ccbff03f702a41b64321d914f8719",
            "user_type": "people",
            "url_token": "luo-gan-5-62",
            "name": "littlebutt",
            "headline": "大厂隐退/自由开发者",
            "avatar_url": "https://picx.zhimg.com/50/v2-3e5a3cfa53098d67eb4f8fca59a364e6_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "badge": [{
              "type": "identity_people",
              "description": "乔治华盛顿大学 计算机科学硕士"
            }],
            "followers_count": 1027,
            "is_following": false,
            "is_followed": false
          },
          "title": "如何评价前端组件库shadcn/ui?",
          "created": 1718259916,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 0,
          "bound_topic_ids": [225, 105112, 156416, 159839, 378484],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "打开官网看了一下，设计风格很vercel，用的是tailwindcss。单配置文件好像是要写一个 component.json比起json配置文件，我其实更喜欢像是next-ui这种theme包的形式。组件组件方面一共48个，除了常规的Alert, Accordion, Badge, Button这种原子组件，还有一些进一步封装的组件，比如 Input OTP Context Menu Aspect Ratio 可以帮助开发者节省掉不少的时间比如最常见的验证码就可以直接用 Input OTP ，但是这个设计风格我觉得在国…",
        "excerpt_new": "打开官网看了一下，设计风格很vercel，用的是tailwindcss。单配置文件好像是要写一个 component.json比起json配置文件，我其实更喜欢像是next-ui这种theme包的形式。组件组件方面一共48个，除了常规的Alert, Accordion, Badge, Button这种原子组件，还有一些进一步封装的组件，比如 Input OTP Context Menu Aspect Ratio 可以帮助开发者节省掉不少的时间比如最常见的验证码就可以直接用 Input OTP ，但是这个设计风格我觉得在国…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"EvFpXhfO\">打开官网看了一下，设计风格很vercel，用的是tailwindcss。单配置文件好像是要写一个<code>component.json</code>比起json配置文件，我其实更喜欢像是<code>next-ui</code>这种theme包的形式。</p><h3>组件</h3><p data-pid=\"S0MMrRwu\">组件方面一共48个，除了常规的Alert, Accordion, Badge, Button这种原子组件，还有一些进一步封装的组件，比如<code>Input OTP</code> <code>Context Menu</code> <code>Aspect Ratio</code> 可以帮助开发者节省掉不少的时间</p><p data-pid=\"kiKpIxf4\">比如最常见的验证码就可以直接用<code>Input OTP</code> ，但是这个设计风格我觉得在国内恐怕很难流行起来（至少中后台应该还是antd一把梭）</p><h3>使用体验</h3><p data-pid=\"g-Owb-nx\"><code>shadcn/ui</code>因为和<code>react</code>深度绑定，但我个人是<code>vue</code>党，所以就很难受，设计风格和动画看着都很不错，但是很可惜，确实没法用，但我个人还是对这个组件库抱有期待 </p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": true,
        "visited_count": 2664,
        "favorite_count": 3,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3529973911}",
      "attached_info": "CvMECNTkus25kc2utwEQBBoJNjcxODg1MzQ0IMPArrMGKAAwDUAfSiMKFVRTX1NPVVJDRV9USEVNRV9NRVJHRRIEMTA2MhgAIAA6AFoJMTA4Njc5OTEwYiA0NzI0NDI3MDEzMTc4YzcxNDViNmY1N2JjYzYyZjUxYXIKMzUyOTk3MzkxMYoBCTY1ODgwODc1NaoBCXJlY29tbWVuZMIBIDczOWQ0ZmY3ZDgwOWVkNTYwMGY3MTA2ZWJjMDdmZDk18gEKCAwSBk5vcm1hbPIBKAgKEiQ2MTk2MmVkZS0yYTBhLTQ0NjQtYmEwYy1jMjE3NDk5MjIyYTXyAQUICxIBNoICAIgCw+XwmI0ykgIgNzM5ZDRmZjdkODA5ZWQ1NjAwZjcxMDZlYmMwN2ZkOTWaAgDKAhNUaGVtZVdha2VVcFJld2VpZ2h02gIVVFNfU09VUkNFX1RIRU1FX01FUkdF6AID+gILTk9STUFMX0ZMT1eKAyA3ZmRiNDRlZjBmZTE0YTQ3YmI0MjM1MjhiMTdlNDA0NZoDDQoCdjAQABoFb3RoZXKoA+gU2AMA6gMbVGhlbWVNZXJnZU5ld1YxUG9vbFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATOgBACoBACwBAC6BAJhacIEAzQwMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAIO7MwD+BBQAAAAAAAAAAiQXQ6n5BlAGwP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUGkAYAkgIlCgk2NzE4ODUzNDQSCjM1Mjk5NzM5MTEYBCIKSU1BR0VfVEVYVA==",
      "action_card": false
    }, {
      "id": "32_1721528759.824",
      "type": "feed",
      "offset": 32,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528759,
      "updated_time": 1721528759,
      "target": {
        "id": 3537010340,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3537010340",
        "author": {
          "id": "a0265e93117d3d366adda36310194727",
          "url": "https://api.zhihu.com/people/a0265e93117d3d366adda36310194727",
          "user_type": "people",
          "url_token": "jzwa",
          "name": "平凡",
          "headline": "AI｜留学｜语言｜合作V + pingfan-uk",
          "avatar_url": "https://pic1.zhimg.com/50/v2-9f81432bb5f397e14ec2c65e949eb0d3_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "badge": [{
            "type": "best_answerer",
            "description": "英语等 3 个话题下的优秀答主",
            "topic_names": ["英语", "编程", "AIGC"],
            "topic_ids": [1100, 1354, 2236786]
          }, {
            "type": "identity_people",
            "description": "Coventry Univesrity Lecturer"
          }],
          "followers_count": 128716,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1718898176,
        "updated_time": 1718898176,
        "voteup_count": 532,
        "thanks_count": 39,
        "comment_count": 17,
        "is_copyable": false,
        "question": {
          "id": 658581470,
          "type": "question",
          "url": "https://api.zhihu.com/questions/658581470",
          "author": {
            "id": "698d53aaddc06f19a2be5b9652873ecf",
            "url": "https://api.zhihu.com/people/698d53aaddc06f19a2be5b9652873ecf",
            "user_type": "people",
            "url_token": "tequila-83-19",
            "name": "Tequila",
            "headline": "",
            "avatar_url": "https://picx.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 1,
            "followers_count": 36,
            "is_following": false,
            "is_followed": false
          },
          "title": "程序员是怎么学会那么多技术的？",
          "created": 1718033020,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 7,
          "bound_topic_ids": [707, 1354, 10033, 12452, 1372095],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "thumbnail": "https://picx.zhimg.com/50/v2-8ee94d578575e91fe6cbe8317eb76a4e_720w.jpg?source=b6762063",
        "excerpt": "程序员掌握的一些技能属于通用技能，比如说数据结构，这个在不同的语言下面下核心是不变的，比如单链表，不会因为在python还是java，还是C++，都是一样的。 而有一些就属于跟语言或者领域强绑定的，有些库Python有，但是R没有，这种需要额外花点时间。 Github上有这么一个库，它讲的是对于软件开发人员的「常青树技能」，也就是不管到哪里都能用的是的技能。   它分为了技术性和非技术的技能，然后还把非技术性放在了前面，比如沟…",
        "excerpt_new": "程序员掌握的一些技能属于通用技能，比如说数据结构，这个在不同的语言下面下核心是不变的，比如单链表，不会因为在python还是java，还是C++，都是一样的。 而有一些就属于跟语言或者领域强绑定的，有些库Python有，但是R没有，这种需要额外花点时间。 Github上有这么一个库，它讲的是对于软件开发人员的「常青树技能」，也就是不管到哪里都能用的是的技能。   它分为了技术性和非技术的技能，然后还把非技术性放在了前面，比如沟…",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "need_payment",
        "content": "<p data-pid=\"Hahh6xK3\">程序员掌握的一些技能属于通用技能，比如说数据结构，这个在不同的语言下面下核心是不变的，比如单链表，不会因为在python还是java，还是C++，都是一样的。</p><p data-pid=\"PFv-XR1K\">而有一些就属于跟语言或者领域强绑定的，有些库Python有，但是R没有，这种需要额外花点时间。</p><p data-pid=\"rY45e_aS\">Github上有这么一个库，它讲的是对于软件开发人员的「常青树技能」，也就是不管到哪里都能用的是的技能。</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-56c248c41e4d7d470a18c3ae0f7f0fe3_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"3332\" data-rawheight=\"1826\" data-original-token=\"v2-53338e990c7a6df4fbc0f9cf2f43e545\" data-default-watermark-src=\"https://pic3.zhimg.com/v2-b52f0714ffaa75dda4000b8c6187817c_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"3332\" data-original=\"https://picx.zhimg.com/v2-56c248c41e4d7d470a18c3ae0f7f0fe3_r.jpg\"/></figure><p data-pid=\"yU-SOING\">它分为了技术性和非技术的技能，然后还把非技术性放在了前面，比如沟通，团队合作等等，一个人的精力毕竟有限，其次问题解决能力等也是必要的，因为技术不断在发展进步，你不可能永远保持最新的技术，只能是遇到问题然后解决。</p><div class=\"highlight\"><pre><code class=\"language-text\">开发者常青技能 / Evergreen Skills for Developers\n│\n├── 非技术技能 / Non-technical Skills\n│   ├── 核心技能 / Core Skills\n│   │   ├── 沟通 / Communication\n│   │   └── 团队合作 / Teamwork\n│   ├── 创新与（自我）管理 / Innovation &amp; (self-)management\n│   │   ├── 开发过程 / Development Process\n│   │   ├── 问题解决 / Problem Solving\n│   │   └── 心态 / Mindset\n│\n├── 技术技能 / Technical Skills\n│   ├── 通用技术知识 / General Technical Knowledge\n│   │   ├── 编程原则 / Programming Principles\n│   │   ├── 数据结构 / Data Structures\n│   │   ├── 干净代码 / Clean Code\n│   │   ├── 源代码管理 / Source Code Management\n│   │   ├── 技术协作 / Technical Collaboration\n│   │   ├── DevOps 实践 / DevOps Practices\n│   │   └── 其他知识 / Other Knowledge\n│   │       ├── 语言理论 / Language-Theory\n│   │       ├── 优化 / Optimization\n│   │       └── 并发性 / Concurrency\n│   └── 特定领域技术知识 / Field-Specific Technical Knowledge\n│       ├── 前端开发 / Front-end Development\n│       ├── 后端开发 / Back-end Development\n│       ├── 架构 / Architecture\n│       ├── 基础设施 / Infrastructure\n│       └── 安全 / Security\n</code></pre></div><p data-pid=\"7UHEItDY\">其次就是技术技能，这就涉及到计算机的专业知识了，比如通用技术里的编程原则，数据结构，怎么写出干净、整洁、易读的代码等等。</p><p data-pid=\"8hrWMfQF\">除此以外，还有一些特定领域的知识，比如前后端开发，做架构的，做infra的，这些都需要各自特定领域的知识。</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-cdc93e6b3dba8e81e20c81c2808c8417_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"1380\" data-rawheight=\"1010\" data-original-token=\"v2-c5805fd9d6b09167aa8a3430f240e860\" data-default-watermark-src=\"https://pic3.zhimg.com/v2-d394c3e401da9301806a074a013d8b24_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"1380\" data-original=\"https://picx.zhimg.com/v2-cdc93e6b3dba8e81e20c81c2808c8417_r.jpg\"/></figure><p data-pid=\"ZdedQWkT\">这些不同工作的技术栈是不同的，互相之间不通用。</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-b3c5cd27c7dd138de9158de4f0b0a5cb_b.jpg\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"756\" data-rawheight=\"948\" data-original-token=\"v2-2e0d918d327113945338cceb14ee3172\" data-default-watermark-src=\"https://pic2.zhimg.com/v2-11ac5a3147934ea5b739fab5465536f5_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"756\" data-original=\"https://picx.zhimg.com/v2-b3c5cd27c7dd138de9158de4f0b0a5cb_r.jpg\"/></figure><p data-pid=\"ELfh-Bn4\">不过现在好的地方是AI辅助编程还是很爽的</p><a href=\"https://www.zhihu.com/question/640036429/answer/3367658299\" data-draft-node=\"block\" data-draft-type=\"link-card\" data-image=\"https://picx.zhimg.com/v2-106beee6924f18c67e1e53c8d651b0a7_180x120.jpg\" data-image-width=\"1269\" data-image-height=\"653\" class=\"internal\">大家现在使用哪些AI辅助编程工具？节省了多少工作量？</a><p data-pid=\"L2LoxFtE\">简单的逻辑可以直接生成</p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-652c26258b7113982ac924cd300fe523_b.gif\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"996\" data-rawheight=\"716\" data-original-token=\"v2-652c26258b7113982ac924cd300fe523\" data-thumbnail=\"https://pic4.zhimg.com/v2-652c26258b7113982ac924cd300fe523_b.jpg\" data-default-watermark-src=\"https://pic4.zhimg.com/v2-652c26258b7113982ac924cd300fe523_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"996\" data-original=\"https://pic4.zhimg.com/v2-652c26258b7113982ac924cd300fe523_r.jpg\"/></figure><p data-pid=\"1dCqW188\">复杂点的也可以通过多次询问来尽可能的保证正确率。</p><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-8e815546eec09a0e2546d88f7f0b4d99_b.gif\" data-caption=\"\" data-size=\"normal\" data-rawwidth=\"996\" data-rawheight=\"716\" data-original-token=\"v2-8e815546eec09a0e2546d88f7f0b4d99\" data-thumbnail=\"https://pic2.zhimg.com/v2-8e815546eec09a0e2546d88f7f0b4d99_b.jpg\" data-default-watermark-src=\"https://pic2.zhimg.com/v2-8e815546eec09a0e2546d88f7f0b4d99_b.jpg\" class=\"origin_image zh-lightbox-thumb\" width=\"996\" data-original=\"https://pic2.zhimg.com/v2-8e815546eec09a0e2546d88f7f0b4d99_r.jpg\"/></figure><p></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 37850,
        "thumbnails": ["https://picx.zhimg.com/50/v2-8ee94d578575e91fe6cbe8317eb76a4e_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-4b68b78e8a3776ae68f0ccf73388421b_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-a4c7ff51de754584361552fc984fc76a_720w.jpg?source=b6762063", "https://pica.zhimg.com/50/v2-d642eb94a3bb6ba74c34b3468edfde3b_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-247446a54441f64b8223f528c6114455_720w.jpg?source=b6762063"],
        "favorite_count": 1528,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3537010340}",
      "attached_info": "CrMFCNTkus25kc2utwEQBBoJNjczMTY1MjUyIICc0bMGKJQEMBFAIEo8Ch9UU19TT1VSQ0VfQ09OVFJPTF9JTlRFUkVTVF9XT1JEEhM0ODk5OTE2Mzk0NTgwMjk5Njc1GAAgADoAWgkxMDg2Mjk0OTRiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgozNTM3MDEwMzQwigEJNjU4NTgxNDcwqgEJcmVjb21tZW5kwgEgYTAyNjVlOTMxMTdkM2QzNjZhZGRhMzYzMTAxOTQ3MjfyAQoIDBIGTm9ybWFs8gEoCAoSJDc3YWJlYjlkLWRiMjgtNGRjNC04MGI1LTgyMDU0MGVhODNjN/IBBQgLEgE2ggIAiALD5fCYjTKSAiBhMDI2NWU5MzExN2QzZDM2NmFkZGEzNjMxMDE5NDcyN5oCAMoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXKAhZGZWVkQ29udHJvbEJyZWFrSW5SdWxl2gIfVFNfU09VUkNFX0NPTlRST0xfSU5URVJFU1RfV09SROgCBfoCC05PUk1BTF9GTE9XigMgN2ZkYjQ0ZWYwZmUxNGE0N2JiNDIzNTI4YjE3ZTQwNDWaAw0KAnYwEAAaBW90aGVyqAPapwLYAwDqAxNDb250cm9sSW50ZXJlc3RXb3Jk+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATWgBACoBACwBAC6BAZtYW51YWzCBAMxNjDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBO2FxAH5BAAAACAyo7U/gQUAAAAAAAAAAIkF0Op+QZQBsD+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFE+AFAOgFAPAFBpAGAJICJQoJNjczMTY1MjUyEgozNTM3MDEwMzQwGAQiCklNQUdFX1RFWFQ=",
      "action_card": false
    }, {
      "id": "33_1721528759.398",
      "type": "feed",
      "offset": 33,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528759,
      "updated_time": 1721528759,
      "target": {
        "id": 3025776484,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3025776484",
        "author": {
          "id": "bb8cac253b38a28d1eb1542cfe39e15a",
          "url": "https://api.zhihu.com/people/bb8cac253b38a28d1eb1542cfe39e15a",
          "user_type": "people",
          "url_token": "bo-yu-49-66",
          "name": "爆笑公堂",
          "headline": "",
          "avatar_url": "https://pic1.zhimg.com/50/v2-7d0f3f9898765f6087fc8fe86eabbfcb_l.jpg?source=b6762063",
          "is_org": false,
          "gender": -1,
          "followers_count": 42838,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1683947158,
        "updated_time": 1683947158,
        "voteup_count": 824,
        "thanks_count": 176,
        "comment_count": 292,
        "is_copyable": true,
        "question": {
          "id": 407398579,
          "type": "question",
          "url": "https://api.zhihu.com/questions/407398579",
          "author": {
            "id": "a45a4e5e85834fc65685253d6bf576ff",
            "url": "https://api.zhihu.com/people/a45a4e5e85834fc65685253d6bf576ff",
            "user_type": "people",
            "url_token": "ke-li-si-53-14",
            "name": "克里斯",
            "headline": "",
            "avatar_url": "https://picx.zhimg.com/50/v2-19f88bdeb44092161933cb51480e2e10_l.jpg?source=b6762063",
            "is_org": false,
            "gender": -1,
            "followers_count": 1225,
            "is_following": false,
            "is_followed": false
          },
          "title": "卧龙凤雏两位人才是什么梗？",
          "created": 1594958213,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 0,
          "bound_topic_ids": [99, 253, 140286],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "thumbnail": "https://picx.zhimg.com/50/v2-199333a8af5796f9acb0700edda8996e_720w.jpg?source=b6762063",
        "thumbnail_extra_info": {
          "video_id": "1640673083605377025",
          "type": "video",
          "url": "https://picx.zhimg.com/v2-199333a8af5796f9acb0700edda8996e.jpg?source=25ab7b06",
          "height": 720,
          "width": 1280,
          "duration": 40,
          "playlist": {
            "ld": {
              "url": "https://vdn6.vzuu.com/SD/967961dc-f13a-11ed-95f4-06e3d4a476ba-v8_f2_t1_f5jSMXEp.mp4?pkey=AAWdwL8-MPlgLjwOzaf-vPcVxBouOmshlVdDCpeIDz7vzYmTgy_PzCIi5KKZwzn5PVV2DUiCiDAXGLfBIa5aPD9p&bu=b9ce98d5&c=avc.8.0&expiration=1721535959&f=mp4&pu=1513c7c2&v=ks6",
              "width": 848,
              "height": 478,
              "bitrate": 1155,
              "duration": 40,
              "format": "mp4",
              "fps": 25,
              "size": 5875049
            },
            "sd": {
              "url": "https://vdn6.vzuu.com/SD/967961dc-f13a-11ed-95f4-06e3d4a476ba-v8_f2_t1_f5jSMXEp.mp4?pkey=AAWdwL8-MPlgLjwOzaf-vPcVxBouOmshlVdDCpeIDz7vzYmTgy_PzCIi5KKZwzn5PVV2DUiCiDAXGLfBIa5aPD9p&bu=b9ce98d5&c=avc.8.0&expiration=1721535959&f=mp4&pu=1513c7c2&v=ks6",
              "width": 848,
              "height": 478,
              "bitrate": 1155,
              "duration": 40,
              "format": "mp4",
              "fps": 25,
              "size": 5875049
            },
            "hd": {
              "url": "https://vdn6.vzuu.com/SD/967961dc-f13a-11ed-95f4-06e3d4a476ba-v8_f2_t1_f5jSMXEp.mp4?pkey=AAWdwL8-MPlgLjwOzaf-vPcVxBouOmshlVdDCpeIDz7vzYmTgy_PzCIi5KKZwzn5PVV2DUiCiDAXGLfBIa5aPD9p&bu=b9ce98d5&c=avc.8.0&expiration=1721535959&f=mp4&pu=1513c7c2&v=ks6",
              "width": 848,
              "height": 478,
              "bitrate": 1155,
              "duration": 40,
              "format": "mp4",
              "fps": 25,
              "size": 5875049
            }
          },
          "show_maker_entrance": false,
          "play_auth_token": "V1-0f31dc4683300b655fd5d693382600f9-0-9106f1b6470811efa7bbc2470fdf0d4e-1721528759023-1721615159023-f3bdaca06580455a780b89d7a7999446b79ede69ec78b7bb5a5c39a623360633"
        },
        "excerpt": "",
        "excerpt_new": "",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 1,
        "play_count": 2209605,
        "attachment": {
          "type": "video",
          "is_complete": true,
          "parent_content_token": "1640673161179136001",
          "split_start": 0,
          "parent_play_count": 3056611,
          "parent_voteup_count": 131,
          "parent_title": "卧龙与凤雏之间的的较量哈哈哈。。"
        },
        "thumbnails": ["https://picx.zhimg.com/50/v2-199333a8af5796f9acb0700edda8996e_720w.jpg?source=b6762063"],
        "favorite_count": 370,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3025776484}",
      "attached_info": "CrIFCNTkus25kc2utwEQBBoJNTgwMjI2OTkyIJb9+6IGKLgGMKQCQCFKNAofVFNfU09VUkNFX0ZFRURSRV9WM19WSURFT19NRVJHRRIBMBgAIAA6CnsicmF3IjoiIn1aCDUyODEwMzIyYiA0NzI0NDI3MDEzMTc4YzcxNDViNmY1N2JjYzYyZjUxYWiBwN+moe+14hZyCjMwMjU3NzY0ODSKAQk0MDczOTg1NzmqAQlyZWNvbW1lbmTCASBiYjhjYWMyNTNiMzhhMjhkMWViMTU0MmNmZTM5ZTE1YfIBCggMEgZOb3JtYWzyASgIChIkYmY0MGY0NWItNTQxNC00ZDljLThlODYtOTk5ZGFmYTExZjBj8gEFCAsSATaCAgCIAsPl8JiNMpICIGJiOGNhYzI1M2IzOGEyOGQxZWIxNTQyY2ZlMzllMTVhmgIAygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxlygIXWnZpZGVvRXhwYW5kV1dlaWdodFJ1bGXaAh9UU19TT1VSQ0VfRkVFRFJFX1YzX1ZJREVPX01FUkdF6AIC+gILTk9STUFMX0ZMT1eKAyA3ZmRiNDRlZjBmZTE0YTQ3YmI0MjM1MjhiMTdlNDA0NZoDDQoCdjAQABoFb3RoZXKoAwHYAwDqAw9mZWVkcmVfdjNfdmlkZW/6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAzE2MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAAJMlpj+BBQAAAAAAAAAAiQXQ6n5BlAGwP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUGkAYAkgIgCgk1ODAyMjY5OTISCjMwMjU3NzY0ODQYBCIFVklERU8=",
      "action_card": false
    }, {
      "id": "34_1721528759.299",
      "type": "feed",
      "offset": 34,
      "verb": "TOPIC_ACKNOWLEDGED_ARTICLE",
      "created_time": 1721528759,
      "updated_time": 1721528759,
      "target": {
        "id": 692638371,
        "type": "article",
        "url": "https://api.zhihu.com/articles/692638371",
        "author": {
          "id": "24888447f6a70f4048b1d49857dde11a",
          "url": "https://api.zhihu.com/people/24888447f6a70f4048b1d49857dde11a",
          "user_type": "people",
          "url_token": "f6-82",
          "name": "我F6呢",
          "headline": "",
          "avatar_url": "https://picx.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 573,
          "is_following": false,
          "is_followed": false
        },
        "title": "最适合普通人（没毅力）的减肥方式是什么？",
        "comment_permission": "all",
        "created": 1713180799,
        "updated": 1715916942,
        "voteup_count": 4993,
        "voting": 0,
        "comment_count": 2070,
        "linkbox": {
          "category": "",
          "pic": "",
          "title": "",
          "url": ""
        },
        "excerpt": "声明：本文已锁定修改，后续不添加任何佣金卡片，不涉及任何商业营销，单纯记录本人科学高效的减肥方法，有任何问题或更好的方法欢迎移步评论区交流， 以下正文：有一个中国中医科学院出的燃脂胶囊，实测对本人中重度肥胖非常有效！ 不仅肚子会快速变平，四肢很修长的瘦下来，对于体脂超标引起的发腮、颈部富贵包、胖打呼噜它都有很大程度的改善作用！！ 是我用过无数方法中，唯一能从根源上解决问题的答案！ 如果按减肥的常规换…",
        "excerpt_new": "声明：本文已锁定修改，后续不添加任何佣金卡片，不涉及任何商业营销，单纯记录本人科学高效的减肥方法，有任何问题或更好的方法欢迎移步评论区交流， 以下正文：有一个中国中医科学院出的燃脂胶囊，实测对本人中重度肥胖非常有效！ 不仅肚子会快速变平，四肢很修长的瘦下来，对于体脂超标引起的发腮、颈部富贵包、胖打呼噜它都有很大程度的改善作用！！ 是我用过无数方法中，唯一能从根源上解决问题的答案！ 如果按减肥的常规换…",
        "preview_type": "default",
        "preview_text": "",
        "content": "<p data-pid=\"YgqQj401\"><b>声明：本文已锁定修改，后续不添加任何佣金卡片，不涉及任何商业营销，单纯记录本人科学高效的减肥方法，有任何问题或更好的方法欢迎移步评论区交流，</b><br/><br/>以下正文：</p><hr/><p data-pid=\"ZPokoyJJ\">有一个中国中医科学院出的燃脂胶囊，实测对本人中重度肥胖非常有效！<br/><br/>不仅肚子会快速变平，四肢很修长的瘦下来，对于体脂超标引起的发腮、颈部富贵包、胖打呼噜它都有很大程度的改善作用！！<br/><br/><b>是我用过无数方法中，唯一能从根源上解决问题的答案！</b><br/><br/></p><p data-pid=\"ku5DUm-Y\">如果按减肥的常规换算逻辑——<br/><br/>▷ <b>减掉一公斤脂肪要燃烧7700卡路里</b></p><p data-pid=\"FxYN7jwo\"><b>▷ 爬坡半小时只消耗300卡路里，</b></p><p data-pid=\"P3ikQUQT\"><b>▷ 跑步10公里才消耗900卡路里。   </b>你说这个正常减肥的效率搞不搞心态？实话说普通人都很难坚持下来，一是短期内看不到效果，时间成本太高，二是无法克服人体贪堕的本能<br/><br/></p><p data-pid=\"rilJE13d\"><b>所以这个燃脂胶囊最高明的地方在于：</b></p><p data-pid=\"OgXYHsQi\"><b>类黄酮可以首先阻断食物中的糖分和热量分解，从一定程度上保证你不再长胖，之后利用里面的左旋肉碱（认证专利成分）加速脂肪代谢燃烧，提高自身运动排脂水平，减肥效果可以翻倍提升</b></p><figure data-size=\"normal\"><img src=\"https://pic1.zhimg.com/v2-48a70bdf7140912829a426ee806a4af6_b.jpg\" data-rawwidth=\"5712\" data-rawheight=\"4284\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-817a32cec6aba9d2c52e12d209bb8149\" class=\"origin_image zh-lightbox-thumb\" width=\"5712\" data-original=\"https://pic1.zhimg.com/v2-48a70bdf7140912829a426ee806a4af6_r.jpg\"/></figure><p data-pid=\"cWXw9LTL\"><br/>● 在自然子刊：大脑的<b>[</b>肥胖记忆<b>]</b>让减重难持续的研究论文中就表示：因为我们的脂肪是通过线粒体做功来消耗的，但线粒体被一层膜包裹，所以脂肪很难大量集中进入线粒体中进行消耗，</p><p data-pid=\"JgfHi9KT\">但左旋肉碱可以把脂肪一车车搬运到线粒体里，让它第一步就被集中氧化消耗，这样配合想不瘦都难！<br/><br/><b>给你们看一下我身体年后的变化就知道了</b></p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-7cc7c6acb209c956776e48e4ca9e0571_b.jpg\" data-rawwidth=\"580\" data-rawheight=\"512\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-390462f17bb039980586ab1b2dde4fd1\" class=\"origin_image zh-lightbox-thumb\" width=\"580\" data-original=\"https://pic4.zhimg.com/v2-7cc7c6acb209c956776e48e4ca9e0571_r.jpg\"/></figure><p data-pid=\"Grm6TX9T\">肥肉直接脱了一层</p><figure data-size=\"normal\"><img src=\"https://pica.zhimg.com/v2-14584b5d6773710f29990a4708138e00_b.jpg\" data-rawwidth=\"582\" data-rawheight=\"530\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-716996cbf99939c1e78304339d96e234\" class=\"origin_image zh-lightbox-thumb\" width=\"582\" data-original=\"https://pica.zhimg.com/v2-14584b5d6773710f29990a4708138e00_r.jpg\"/></figure><p data-pid=\"1lnGC7Xn\">体脂率降下去后，日常慢慢配合了一些有氧+无氧的运动，身体慢慢就会雕刻出这种线条感，配合光影真的绝</p><figure data-size=\"normal\"><img src=\"https://pic2.zhimg.com/v2-54aa8b5bbf04d0aceebf9fa4e049956b_b.jpg\" data-rawwidth=\"1176\" data-rawheight=\"1141\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-85f72415a889e32ff9a9a2e39043a575\" class=\"origin_image zh-lightbox-thumb\" width=\"1176\" data-original=\"https://pic2.zhimg.com/v2-54aa8b5bbf04d0aceebf9fa4e049956b_r.jpg\"/></figure><p data-pid=\"WIz5yCDa\">—</p><p data-pid=\"SxPQvWAg\">而且这个效果是累积的，越往后我身上的赘肉越少，关键每次运动完一上秤就很有成就感你明白吗，之前怎么减也减不下去，</p><p data-pid=\"Tg4SihMv\">但现在就跟打游戏一样、好像达成了一个个目标，整个过程丝毫不痛苦，反而充满了期待和成就感</p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-e7451f908a5246a77d91e518c8971e82_b.jpg\" data-rawwidth=\"586\" data-rawheight=\"389\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-448f7968b2c489d7c5f880f6c69f6373\" class=\"origin_image zh-lightbox-thumb\" width=\"586\" data-original=\"https://pic3.zhimg.com/v2-e7451f908a5246a77d91e518c8971e82_r.jpg\"/></figure><p data-pid=\"Zxc8Jujb\">我认为这才是真正将合理瘦身+健康结合在一起的减肥方法！<br/><br/>对腿我也非常满意</p><figure data-size=\"normal\"><img src=\"https://pic3.zhimg.com/v2-9a79017abb6c068abc38cfe904627e36_b.jpg\" data-rawwidth=\"1024\" data-rawheight=\"593\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-8cb484d7a98b9a4c23c3e0f6585e7db9\" class=\"origin_image zh-lightbox-thumb\" width=\"1024\" data-original=\"https://pic3.zhimg.com/v2-9a79017abb6c068abc38cfe904627e36_r.jpg\"/></figure><p data-pid=\"-ujMjZez\"><br/>要知道3个月以前我还是个200斤+的大胖子</p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-aefcfa8fe056ae1d9e1ab96672e21d67_b.jpg\" data-rawwidth=\"1176\" data-rawheight=\"1038\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-39a2c8d154ef18c57fcfc2292edec946\" class=\"origin_image zh-lightbox-thumb\" width=\"1176\" data-original=\"https://picx.zhimg.com/v2-aefcfa8fe056ae1d9e1ab96672e21d67_r.jpg\"/></figure><p data-pid=\"5Zegtsxo\"><br/>不吃这个燃脂胶囊根本达不到这样的效果啊！</p><figure data-size=\"normal\"><img src=\"https://pic4.zhimg.com/v2-3e3fee18386e0137c08e63e6ee0b167b_b.jpg\" data-rawwidth=\"1176\" data-rawheight=\"865\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-33246d49380e05a2693c76bfb0dd401b\" class=\"origin_image zh-lightbox-thumb\" width=\"1176\" data-original=\"https://pic4.zhimg.com/v2-3e3fee18386e0137c08e63e6ee0b167b_r.jpg\"/></figure><p data-pid=\"AD1xUld9\"><b>所以  体重大的或者长时间减不下去没动力的，真心建议你试试这个燃脂胶囊，</b></p><p data-pid=\"MotrYCFK\"><b>配合小定量运动，之后体重就像开了挂一样飕飕掉秤。还是减脂瘦全身的那种</b></p><figure data-size=\"normal\"><img src=\"https://picx.zhimg.com/v2-55ed8f4e83f33c3873d707eb8befad45_b.jpg\" data-rawwidth=\"1176\" data-rawheight=\"814\" data-size=\"normal\" data-caption=\"\" data-original-token=\"v2-b39621e8a216c4d993798dee4b17220c\" class=\"origin_image zh-lightbox-thumb\" width=\"1176\" data-original=\"https://picx.zhimg.com/v2-55ed8f4e83f33c3873d707eb8befad45_r.jpg\"/></figure><p data-pid=\"rB5bzcjc\"><br/>而且这种减肥的底层机制就注定了不会反弹，因为其根源还是要依赖你的运动来提供热量动力，只不过起到的是事半功倍的效果，等你瘦到满意的体重时停用即可不会复胖，<br/><br/>真的，分享给大家不是因为它是什么神药，<br/><br/>而是我看有些人为了减肥什么都做得出来，断食好几天不吃饭虐待自己，真不能长期这样，你的胃和大脑不是傻X。老是蒙它们是要遭报应的，<br/>所以最好和我一样，该吃吃，该动动，只要精神饱满，身体处于一个积极代谢的水平，就不可能瘦不下来，我就是一个活生生的例子<br/><br/>现在市面上的减肥产品多的看不过来，什么白芸豆、祛湿膏，减肥茶、国外同款什么的，绝大多数是小厂家为谋私利做的，瞎买真的很容易交智商税<br/><br/><b>所以我建议大家还是走正规科学的渠道减肥，选这个中国中医科学院出品的左旋肉碱就不会错。受食品药品监督管理局统一监管，该有的备案、人体检测、效果一个不会少！</b><br/><br/></p><p data-pid=\"UWaEIFlK\">我对我的分享负责，因为我很少在知乎写东西，之前一直害怕我分享的东西大家用了没效果，或者吃出什么毛病了再来追究我的责任<br/><br/>但这个实打实是能帮到我们减肥的好东西，这种减肥真科学的门槛很高，而且人背景足够强，所以把这个分享出来我也完全没负担<br/><br/>算是分享一个信息差吧，毕竟很多人都没听过这东西。<br/>如果有人用过或者准备用的话，可以在评论区反馈一下，帮助更多人，如果你不需要减肥那更好，只用顶一下就可以了。<br/><br/><b>参考文献：</b></p><blockquote data-pid=\"-ZKvqdf3\">[1] 陆妹,刘登礼.线粒体脂肪酸氧化代谢病的饮食与营养干预[J].中国实用儿科杂志,2022,37(10):739-743.DOI:10.19538/j.ek2022100606.<br/>[2] 张奕,陈曼曼,陈洪璋,等.左旋肉碱类膳食补充对超重肥胖成年人体格指标的影响[J].现代预防医学,2022,49(11):1970-1974+1986.<br/>[3] 陈怡伶.有氧运动结合左旋肉碱对超重人群脂质代谢影响研究[D].江西科技师范大学,2020.DOI:10.27751/d.cnki.gjxkj.2020.000257.<br/>[4]刘双燕,杨宽.一种新型左旋肉碱的提取纯化及其减肥降脂作用[J/OL].食品与发酵工业,1-13[2024-02-15].cnki.11-1804</blockquote><p data-pid=\"R4BmKI2k\">以上仅为我个人使用体验，保健食品不是药物，不能代替药物治疗疾病</p>",
        "is_labeled": false,
        "visited_count": 1603735,
        "thumbnails": ["https://pica.zhimg.com/50/v2-817a32cec6aba9d2c52e12d209bb8149_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-85f72415a889e32ff9a9a2e39043a575_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-c6b95d7c7c3c4a281537a6093a958947_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-872a17048726271db13976f2a4c56cf1_720w.jpg?source=b6762063", "https://pic1.zhimg.com/50/v2-5c6e05cf17b44d0a85f6af85d79f6cc1_720w.jpg?source=b6762063"],
        "favorite_count": 12165
      },
      "brief": "{\"source\": \"TS\", \"type\": \"article\", \"id\": 692638371}",
      "attached_info": "CvUFCNTkus25kc2utwEQBxoJMjQyMDUwMjM4IP+g9LAGKIEnMJYQQCJKGQoOUHJvbW90aW9uRXh0cmESATAYACAAOgBiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgk2OTI2MzgzNzGqAQlyZWNvbW1lbmTCASAyNDg4ODQ0N2Y2YTcwZjQwNDhiMWQ0OTg1N2RkZTExYfIBCQgMEgVaUGx1c/IBKAgJEiQwZDUyOWJlNy04NjUwLTQ1YTAtODc5ZC05YmY2NWQyYjcxM2TyASgIChIkY2NiMjU4MzQtOTg3Zi00YWM5LThmYzktYzhiMGQ5NTRkNmU48gEFCAsSATbyAQgICBIEdHJ1ZYICAIgCw+XwmI0ykgIgMjQ4ODg0NDdmNmE3MGY0MDQ4YjFkNDk4NTdkZGUxMWGaAgDKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAihQZWFrQ2xpcHBpbmdGb3JIaWdoTmVnYXRpdmVSZXdlaWdodFJ1bGUzygIdTG93U3ViamVjdGl2ZUxldmVsV2VpZ2h0UnVsZTLKAhdacGx1c0dyU2NvcmVXZWlnaHRSdWxlMcoCDkN1cnJlbmN5UmFua2VyygIOc2xvdEluc2VydFJ1bGXaAg5Qcm9tb3Rpb25FeHRyYegCAfoCC05PUk1BTF9GTE9XigMgN2ZkYjQ0ZWYwZmUxNGE0N2JiNDIzNTI4YjE3ZTQwNDWaAw0KAnYwEAAaBW90aGVyqAOX8WHYAwD6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQBiAQAkgQFWlBsdXOaBAExoAQAqAQAsAQAugQGbWFudWFswgQCMzDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAAC48Iw/gQUNcB0cDC9LQIkF0Op+QZQBsD+SBQCaBQNkZnSiBQNkZnSyBQExuQXqxZlKDqUGQNAFAOAFAOgFAPAFBpAGAJICJAoJMjQyMDUwMjM4Egk2OTI2MzgzNzEYByIKSU1BR0VfVEVYVA==",
      "action_card": false,
      "promotion_extra": "{\"is_card\":true,\"id\":\"3104159\",\"topstory_info\":\"bid=195.71516819744076&pctr=0.01834622025489807&price=0&pv_id=0d529be7-8650-45a0-879d-9bf65d2b713d\",\"parameters\":\"plugcb=https%3A%2F%2Fsugar.zhihu.com%2Fplutus_adreaper_callback%3Fcid%3D3104159%26ccid%3D1280801%26zoneid%3D10012%26adid%3D3173644%26sid%3D0d529be7-8650-45a0-879d-9bf65d2b713d%26adsource%3Dzhi_plus%26ocpxs%3D1%26ocpxp%3D2200%26dynamictitle%3D0%26mixinfo%3D__MIX__INFO__%26campaignid%3D2215923%26cbed%3DCidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu%26cmixid%3D%26cmixvs%3D%26isnative%3Dfalse\",\"sign\":\"a8f4976f-748e-4b74-a6b0-51f2f3db713a\",\"mobile_experiment\":null,\"new_asset\":\"\",\"click_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mix=__MIX__INFO__&cc=510600&tev=0&ed=CidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu&hp=0&cmv=&mcdti=0&zpt=&cv=&ui=60.255.228.141&ar=0.014131009578704834&cla=1&pt=3&isy=__IMAGE_STYLE__&zri=-5233969417751186860&mcdtt=0&cl=&zk=&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&zpluspt=0&iti=__IS_THREE_IMAGE__&dts=1721528758&cmi=&at=CjEEKVQqOSuIYIdBvEo7Wg==\"],\"view_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mix=__MIX__INFO__&cc=510600&tev=0&ed=CidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu&hp=0&cmv=&mcdti=0&zpt=&cv=&ui=60.255.228.141&ar=0.014131009578704834&cla=1&pt=3&isy=__IMAGE_STYLE__&zri=-5233969417751186860&mcdtt=0&cl=&zk=&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&zpluspt=0&iti=__IS_THREE_IMAGE__&dts=1721528758&cmi=&at=CjEEPFEmLWm8-o_znDYB\"],\"view_x_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mix=__MIX__INFO__&cc=510600&tev=0&ed=CidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu&hp=0&cmv=&mcdti=0&zpt=&cv=&ui=60.255.228.141&ar=0.014131009578704834&cla=1&pt=3&isy=__IMAGE_STYLE__&zri=-5233969417751186860&mcdtt=0&cl=&zk=&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&zpluspt=0&iti=__IS_THREE_IMAGE__&dts=1721528758&cmi=&at=CjEEPFEmLR820zpS4V8L1jE=\"],\"deliver_x_tracks\":[\"http://proxy-ad-track-zplus:10000/ad-track/zplus_log?mix=__MIX__INFO__&cc=510600&tev=0&ed=CidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu&hp=0&cmv=&mcdti=0&zpt=&cv=&ui=60.255.228.141&ar=0.014131009578704834&cla=1&pt=3&isy=__IMAGE_STYLE__&zri=-5233969417751186860&mcdtt=0&cl=&zk=&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&zpluspt=0&iti=__IS_THREE_IMAGE__&dts=1721528758&cmi=&at=CjEELl0vMzYrVw0fll1t8qj4XUE=\"],\"impression_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mix=__MIX__INFO__&cc=510600&tev=0&ed=CidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu&hp=0&cmv=&mcdti=0&zpt=&cv=&ui=60.255.228.141&ar=0.014131009578704834&cla=1&pt=3&isy=__IMAGE_STYLE__&zri=-5233969417751186860&mcdtt=0&cl=&zk=&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&zpluspt=0&iti=__IS_THREE_IMAGE__&dts=1721528758&cmi=&at=CjEEI1UzKCU9VjsIXwyIzIulhGWC\"],\"conversion_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mix=__MIX__INFO__&cc=510600&tev=0&ed=CidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu&hp=0&cmv=&mcdti=0&zpt=&cv=&ui=60.255.228.141&ar=0.014131009578704834&cla=1&pt=3&isy=__IMAGE_STYLE__&zri=-5233969417751186860&mcdtt=0&cl=&zk=&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&zpluspt=0&iti=__IS_THREE_IMAGE__&dts=1721528758&cmi=&at=CjEEKVctLCU8VjsIX1u2KBLeP1SB\"],\"topstory_tracks\":[\"http://proxy-ad-track-zplus-bid:10000/ad-track/zplus/bid?mix=__MIX__INFO__&cc=510600&tev=0&ed=CidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu&hp=0&cmv=&mcdti=0&zpt=&cv=&ui=60.255.228.141&ar=0.014131009578704834&cla=1&pt=3&isy=__IMAGE_STYLE__&zri=-5233969417751186860&mcdtt=0&cl=&zk=&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&zpluspt=0&iti=__IS_THREE_IMAGE__&dts=1721528758&cmi=&at=CjEELF0mPh8nSzQIRYVahjjLuoY=&rki=__RANK__INFO__&fri=__FILTER__INFO__&fin=1\"],\"video_tracks\":[\"https://sugar.zhihu.com/ad-track/zplus_log?mix=__MIX__INFO__&cc=510600&tev=0&ed=CidJdwhlOS89GGdVH2d_Bl52CXkNc2xzfhFhQVI0OENWdR88QipncGhAMRdSJHEATTNbPgVzfCIhSiYOVW18Fgo3UncKZTkkOlFvVxc5Lw1aY1orVn48ISJWN0FdJSUNUnEJew9ybXN6AyEOXG1hBVN0AXMJcGlxdh1lXgBpewZadB85UX5qJHsXawVUZ2EIXXAJZwx2O3BjHWVeVX11Ug1zDC4KIW1xfUF0BlhtfwFcdg9-DGU5NHMUYF8BaHwBTTVLIwp-a3B-FWRQFzMoRAJ4C34Kc29wfBZqQUsgIEUYNU13CGU5IScYYFUAZXUCWGNJOFF-a3J3EmVeB3YjUxs9SncJZTksPRh0DlYjcQBNJEMjBXJqcH8XdARYbX4EWXUMegpwYmY9Sm9VFzUvQAg2BHoeIDIicxV0CFIgNFcEJFV3CXZ8Ly1TIFoBfnwBXnIIfgh0Y3F6FGRWB2h-Fgg3UHcLcmp0fxBrQVIkNQ0bKko-HiIsKXMTYF4FYHsWCCpNdw1lNSM-XSJaA2J8AE0wUCQFcmpwfhRiVwBmakMbMFAuS35rdX4UZ1YXMjwNXnEXeQ50b3V5FWRVBGB5BltxHy5bNSh9fgtiVwFgfABYcQByAHJvdn4UZF8GaXoFXGNLOkoqZ3F-HGpQCHYtVgomBG8PAX9yfEc9CEV1fgJOdnh7HXEZZXwXMQhCJBNWCiZNJUpmaHJrFhNWFGIPFVl3XClIIH9yfABhJgB1fnNOdwsmTDF_cnwAYSYBfn4GUnMBcw50Y3F6EGpWAnV-c053CyZMMQUsIUI7ExRifhVYBBR6Fnpjdn8cZVABYHkAW3EBcgtmaANrF2AIUiAvbwkjHHgKZmkBfwtnUANmfwVScwl6D3Nsc3kRd1VydX4CHCBQLVA3PyQRQzMERT8-FVl3HHl5cn93CiJdwGgX3PYu&hp=0&cmv=&mcdti=0&zpt=&cv=&ui=60.255.228.141&ar=0.014131009578704834&cla=1&pt=3&isy=__IMAGE_STYLE__&zri=-5233969417751186860&mcdtt=0&cl=&zk=&ri=feed-root:currency:4f292015-0175-4a87-b881-81a4a8680565&zpluspt=0&iti=__IS_THREE_IMAGE__&dts=1721528758&cmi=&at=CjEEPFEnPy8RVT4GSP2lJbJWhW_G\"],\"video_play_tracks\":null,\"debug_tracks\":null,\"view_as_click_tm\":5}"
    }, {
      "id": "35_1721528759.474",
      "type": "feed",
      "offset": 35,
      "verb": "TOPIC_ACKNOWLEDGED_ANSWER",
      "created_time": 1721528759,
      "updated_time": 1721528759,
      "target": {
        "id": 3556038192,
        "type": "answer",
        "url": "https://api.zhihu.com/answers/3556038192",
        "author": {
          "id": "06dfad2b0677b2dbaefef6f1ac9922fe",
          "url": "https://api.zhihu.com/people/06dfad2b0677b2dbaefef6f1ac9922fe",
          "user_type": "people",
          "url_token": "cqf119",
          "name": "万答通",
          "headline": "我深深爱我的祖国，如同祖国爱我那般。",
          "avatar_url": "https://picx.zhimg.com/50/v2-35b29ced75a54624ca7c265507a6fd6f_l.jpg?source=b6762063",
          "is_org": false,
          "gender": 1,
          "followers_count": 25903,
          "is_following": false,
          "is_followed": false
        },
        "created_time": 1720490713,
        "updated_time": 1720490713,
        "voteup_count": 19833,
        "thanks_count": 349,
        "comment_count": 669,
        "is_copyable": true,
        "question": {
          "id": 656876821,
          "type": "question",
          "url": "https://api.zhihu.com/questions/656876821",
          "author": {
            "id": "cdb21f7081aba65510d56ce904a24978",
            "url": "https://api.zhihu.com/people/cdb21f7081aba65510d56ce904a24978",
            "user_type": "people",
            "url_token": "43-67-97-75-90",
            "name": "九九最爱猫",
            "headline": "",
            "avatar_url": "https://picx.zhimg.com/50/v2-f0b015b108429769c95d32bfc35773ae_l.jpg?source=b6762063",
            "is_org": false,
            "gender": 0,
            "followers_count": 54,
            "is_following": false,
            "is_followed": false
          },
          "title": "都21世纪了为什么还有人认为纹身泡吧就是坏女孩？",
          "created": 1716416968,
          "answer_count": 0,
          "follower_count": 0,
          "comment_count": 63,
          "bound_topic_ids": [5497],
          "is_following": false,
          "excerpt": "",
          "relationship": {
            "is_author": false
          },
          "detail": "",
          "question_type": "normal"
        },
        "excerpt": "我在抖音上的一大爱好就是看杀人抛尸案。 其中，如果警方发现女尸有纹身，就重点排查娱乐风月场所失踪人员信息。 如果男尸有纹身，就核对刑满释放人员DNA信息库。 为啥有偏见你和警方说吧。",
        "excerpt_new": "我在抖音上的一大爱好就是看杀人抛尸案。 其中，如果警方发现女尸有纹身，就重点排查娱乐风月场所失踪人员信息。 如果男尸有纹身，就核对刑满释放人员DNA信息库。 为啥有偏见你和警方说吧。",
        "preview_type": "default",
        "preview_text": "",
        "reshipment_settings": "allowed",
        "content": "<p data-pid=\"kVObF2Dh\">我在抖音上的一大爱好就是看杀人抛尸案。</p><p data-pid=\"020w57rX\">其中，如果警方发现女尸有纹身，就重点排查娱乐风月场所失踪人员信息。</p><p data-pid=\"S6x32xTa\">如果男尸有纹身，就核对刑满释放人员DNA信息库。</p><p data-pid=\"iLZ2bKzo\">为啥有偏见你和警方说吧。</p><p></p>",
        "relationship": {
          "is_thanked": false,
          "is_nothelp": false,
          "voting": 0
        },
        "is_labeled": false,
        "visited_count": 763598,
        "favorite_count": 1121,
        "answer_type": "normal"
      },
      "brief": "{\"source\": \"TS\", \"type\": \"answer\", \"id\": 3556038192}",
      "attached_info": "CuoECNTkus25kc2utwEQBBoJNjc2NjI0NDEwINm1srQGKPmaATCdBUAjSigKE1RTX1NPVVJDRV9GRUVEUkVfVjgSATAYACAAOgp7InJhdyI6IiJ9WgkxMDgyNTA2NzhiIDQ3MjQ0MjcwMTMxNzhjNzE0NWI2ZjU3YmNjNjJmNTFhcgozNTU2MDM4MTkyigEJNjU2ODc2ODIxqgEJcmVjb21tZW5kwgEgMDZkZmFkMmIwNjc3YjJkYmFlZmVmNmYxYWM5OTIyZmXyAQoIDBIGTm9ybWFs8gEoCAoSJDgwODIxYzg0LWM0MmMtNGM1ZS04NmI0LWFjZWM5Njk5M2MxMPIBBQgLEgE2ggIAiALD5fCYjTKSAiAwNmRmYWQyYjA2NzdiMmRiYWVmZWY2ZjFhYzk5MjJmZZoCAMoCEkNsaXBQZWFrV2VpZ2h0UnVsZdoCE1RTX1NPVVJDRV9GRUVEUkVfVjjoAgL6AgtOT1JNQUxfRkxPV4oDIDdmZGI0NGVmMGZlMTRhNDdiYjQyMzUyOGIxN2U0MDQ1mgMNCgJ2MBAAGgVvdGhlcqgDzs0u2AMA6gMJZmVlZHJlX3Y4+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAIzMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAYI0PuD+BBQAAAAAAAAAAiQXQ6n5BlAGwP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUGkAYAkgIlCgk2NzY2MjQ0MTASCjM1NTYwMzgxOTIYBCIKSU1BR0VfVEVYVA==",
      "action_card": false
    }];
    const list = [...list1, ...list2, ...list3, ...list4, ...list5];

    var _dec, _class;
    function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
    let FeedsController = (_dec = RequestMapping(RequestMethod.GET, "/feeds"), (_class = class FeedsController {
      async getFeeds(ctx) {
        const {
          startNum = 0,
          pageSize = 10
        } = ctx.query || {};
        const resList = list.slice(Number(startNum), Number(startNum) + Number(pageSize));
        ctx.body = {
          list: resList
        };
      }
    }, (_applyDecoratedDescriptor(_class.prototype, "getFeeds", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "getFeeds"), _class.prototype)), _class));

    var index = [UserController, FeedsController];

    const app = new Koa();
    app.use(cors());
    const router = new Router();
    app.use(bodyParser({}));
    app.use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Header', '*');
      ctx.set('Access-Control-Allow-Methods', '*');
      ctx.set('Content-Type', 'application/json;charset=utf-8');
      if (ctx.request.method.toLowerCase === 'options') {
        ctx.status = 200;
      } else {
        await next(ctx);
      }
    });
    const COMMON_API_PREFIX = "/api";
    controllers.forEach(item => {
      let {
        method,
        path,
        handler,
        constructor
      } = item;
      const {
        prefix
      } = constructor;
      if (prefix) {
        path = `${COMMON_API_PREFIX}${prefix}${path}`;
      } else {
        path = `${COMMON_API_PREFIX}${path}`;
      }
      router[method](path, handler);
    });
    app.use(jwtVerify([`${COMMON_API_PREFIX}/user/login`]));
    app.use(router.routes());
    app.listen(3010, () => {
      console.log("koa is run in 3010");
    });

}));
