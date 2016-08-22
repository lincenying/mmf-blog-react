import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '../decorators'
import * as adminActions from '../actions/admin'
import * as globalsActions from '../actions/globals'

function mapStateToProps(state) {
    return {
        article: state.admin.toJS().article
    }
}
function mapDispatchToProps(dispatch) {
    const _Action = Object.assign({}, adminActions, globalsActions)
    return bindActionCreators(_Action, dispatch)
}

@propTypes({
    article: PropTypes.object,
    fetchAdminArticle: PropTypes.func,
    setMessage: PropTypes.func
})
@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
export class AdminArticleEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            category: '',
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentWillMount() {
        const {fetchAdminArticle, params: {id}, location: {pathname}} = this.props
        fetchAdminArticle({
            action: 'getArticle',
            id,
            pathname
        })
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.article.data._id && this.props.article.data._id) {
            this.setState({
                title: this.props.article.data.title,
                category: this.props.article.data.category,
                content: this.props.article.data.content
            })
            // eslint-disable-next-line
            window.editEditor = editormd("edit-content", {
                width: "100%",
                height: 500,
                markdown: "",
                placeholder: '请输入内容...',
                path: '/static/editor.md/lib/',
                toolbarIcons() {
                    return [
                        "bold", "italic", "quote", "|",
                        "list-ul", "list-ol", "hr", "|",
                        "link", "reference-link", "image", "code", "code-block", "table", "|",
                        "watch", "preview", "fullscreen", "|",
                        "help"
                    ]
                },
                watch : false,
                saveHTMLToTextarea : true,
                imageUpload : true,
                imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "/api/?action=upload"
            })
        }
    }
    handleSubmit(event) {
        event.preventDefault()
        const {setMessage, history, params: {page}} = this.props
        const {title, category} = this.state
        // eslint-disable-next-line
        const content = editEditor.getMarkdown()
        if (title === '' || category === '' || content === '') {
            setMessage({
                type: 'error',
                content: '请将表单填写完整!'
            })
            return false
        }
        var data = new FormData(event.target)
        $.ajax({
            contentType: false,
            processData: false,
            data
        }).then(json => {
            if (json.code === 200) {
                setMessage('编辑成功!')
                history.push('/admin/list/' + page)
            } else {
                setMessage({
                    type: 'error',
                    content: json.message
                })
            }
        })
    }
    handleChange(e) {
        const id = e.target.name,
            value = e.target.value
        const state = this.state
        state[id] = value
        this.setState(state)
    }
    render() {
        const { params: {id}} = this.props
        return (
            <div className="g-mn">
                <div className="box">
                    <form onSubmit={this.handleSubmit} id="article-edit" action="/api/" method="post">
                        <section id="edit-title">
                            <input value={this.state.title} onChange={this.handleChange} id="title" type="text" name="title" className="form-control" placeholder="请输入标题" />
                        </section>
                        <section id="edit-category">
                            <select value={this.state.category} onChange={this.handleChange} id="category" name="category" className="form-control">
                                <option value="">请选择分类</option>
                                <option value="1">生活</option>
                                <option value="2">工作</option>
                                <option value="3">其他</option>
                            </select>
                        </section>
                        <section id="edit-content">
                            <textarea value={this.state.content} onChange={this.handleChange} id="editor" name="content" className="form-control hidden" data-autosave="editor-content"></textarea>
                        </section>
                        <section id="edit-submit">
                            <input type="hidden" name="action" value="modify" />
                            <input type="hidden" name="id" defaultValue={id} />
                            <button className="btn btn-success">编辑</button>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}
