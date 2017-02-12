import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '../decorators'
import {setMessage} from 'alias-store-actions/globals'
import config from '../config'

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setMessage}, dispatch)
}

@connect(null, mapDispatchToProps)
@propTypes({
    setMessage: PropTypes.func.isRequired
})
@immutableRenderDecorator
export class AdminArticlePost extends Component {
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
    componentDidMount() {
        // eslint-disable-next-line
        window.articleEditor = editormd("post-content", {
            width: "100%",
            height: 500,
            markdown: "",
            placeholder: '请输入内容...',
            path: '../static/editor.md/lib/',
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
            imageUploadURL : config.api + "?action=upload"
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        const target = event.target
        const {setMessage} = this.props
        const {title, category} = this.state
        // eslint-disable-next-line
        const content = articleEditor.getMarkdown()
        if (title === '' || category === '' || content === '') {
            setMessage({
                type: 'error',
                content: '请将表单填写完整!'
            })
            return false
        }
        var data = new FormData(target)
        $.ajax({
            url: config.api + 'admin/article/post',
            type: 'post',
            contentType: false,
            processData: false,
            data
        }).then(json => {
            if (json.code === 200) {
                setMessage('发布成功!')
                // eslint-disable-next-line
                articleEditor.clear()
                target.reset()
                this.setState({
                    title: '',
                    category: '',
                    content: ''
                })
            } else {
                setMessage({
                    type: 'error',
                    content: json.message
                })
            }
        })
    }
    handleChange(e) {
        const target = e.target
        const id = target.id,
            value = target.value
        const state = this.state
        state[id] = value
        this.setState(state)
    }
    render() {
        return (
            <div className="g-mn">
                <div className="box">
                    <form onSubmit={this.handleSubmit} id="article-post" action={config.api + 'admin/article/post'} method="post">
                        <section id="post-title">
                            <input value={this.state.title} onChange={this.handleChange} id="title" name="title" type="text" className="form-control" placeholder="请输入标题" />
                        </section>
                        <section id="post-category">
                            <select value={this.state.category} onChange={this.handleChange} id="category" name="category" className="form-control">
                                <option value="">请选择分类</option>
                                <option value="1">生活</option>
                                <option value="2">工作</option>
                                <option value="3">其他</option>
                            </select>
                        </section>
                        <section id="post-content">
                            <textarea id="editor" name="content" className="form-control hidden" data-autosave="editor-content" />
                        </section>
                        <section id="post-submit">
                            <input type="hidden" name="action" value="post" />
                            <button className="btn btn-success">发布</button>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}
