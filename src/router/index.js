import Router from 'koa-router'
import jwt from 'koa-jwt'
import { JWTSecret } from '../../config/config.default'
import UserController from '../controller/user'
import categoryController from '../controller/category'
import bookController from '../controller/book'

const router = new Router()

//设置前缀
router.prefix('/api')
/**
 * 分类相关路由
 */

// 登录
router.post('/authenticate', UserController.userLogin)

//设置jwt 权限
router.use(jwt({ secret: JWTSecret }))

// 获取带书籍数量的父分类
router.get('/categories', categoryController.getCategoriesWithBookCount)

// 获取带子分类的分类
router.get('/sub-categories', categoryController.getCategoriesWithSubCategories)

// 获取分类详情
router.get('/category-info', categoryController.getCategoryInfo)

// 获取书籍详情 id: bookid
router.get('/book-info/:id', bookController.getBookInfo)

// 获取作者名下的书籍
router.get('/author-books', bookController.getAuthorBooks)

// 获取书籍章节 id: bookid
router.get('/book-chapters/:id', bookController.getBookChapters)

// 获取章节详细内容
router.get('/chapters/:link', bookController.getChapterContent)

// 获取搜索结果
router.get('/search', bookController.getBookSearchResults)

// 获取书籍源
router.get('/book-sources', bookController.getBookSources)

export default router